package handlers

import (
	"context-ai/models"
	"context-ai/utils"
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
	"time"

	"golang.org/x/crypto/bcrypt"
)

func RegisterUser(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var u models.User
		if err := json.NewDecoder(r.Body).Decode(&u); err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		err := db.QueryRow("SELECT id FROM users WHERE email = $1", u.Email).Scan(&u.ID)
		if err == nil {
			log.Print("User already exists, hence aborting")
			http.Error(w, "User already exists", http.StatusConflict)
			return
		}

		log.Print("Hashing password")
		hashedPassword, err := bcrypt.GenerateFromPassword([]byte(u.Password), bcrypt.DefaultCost)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
		}
		log.Print("Inserting user")
		err = db.QueryRow("INSERT INTO users (name, email, password) values ($1,$2,$3) returning id", u.Name, u.Email, string(hashedPassword)).Scan(&u.ID)

		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		log.Print("Generating JWT token")
		jwtToken, err := utils.GenerateJWTToken(u.ID, u.Email)
		if err != nil {
			http.Error(w, "JWT creation failed", http.StatusInternalServerError)
			return
		}
		log.Print("Setting cookie")
		http.SetCookie(w, &http.Cookie{
			Name:     "token",
			Value:    jwtToken,
			Path:     "/",
			HttpOnly: true,
			Secure:   true, // Use true in production with HTTPS
			SameSite: http.SameSiteLaxMode,
			Expires:  time.Now().Add(24 * time.Hour),
		})

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusCreated)
		response := map[string]any{
			"message": "User created successfully",
		}
		json.NewEncoder(w).Encode(response)
	}
}

func LoginUser(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var u models.User
		if err := json.NewDecoder(r.Body).Decode(&u); err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		var reqPassword string = u.Password

		err := db.QueryRow("SELECT id, password FROM users WHERE email = $1", u.Email).Scan(&u.ID, &u.Password)
		if err != nil {
			http.Error(w, "User doesnt exist", http.StatusUnauthorized)
			return
		}

		err = bcrypt.CompareHashAndPassword([]byte(u.Password), []byte(reqPassword))
		if err != nil {
			http.Error(w, "Invalid email or password", http.StatusUnauthorized)
			return
		}

		log.Print("Generating JWT token")
		jwtToken, err := utils.GenerateJWTToken(u.ID, u.Email)
		if err != nil {
			http.Error(w, "JWT creation failed", http.StatusInternalServerError)
			return
		}
		log.Print("Setting cookie")
		http.SetCookie(w, &http.Cookie{
			Name:     "token",
			Value:    jwtToken,
			Path:     "/",
			HttpOnly: true,
			Secure:   true, // Use true in production with HTTPS
			SameSite: http.SameSiteLaxMode,
			Expires:  time.Now().Add(24 * time.Hour),
		})

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		response := map[string]any{
			"message": "Login successful",
		}
		json.NewEncoder(w).Encode(response)
	}
}
