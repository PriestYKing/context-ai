package main

import (
	"context-ai/db"
	"context-ai/handlers"
	"context-ai/middleware"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

func main() {
	// Initialize database
	db, err := db.InitDB()
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}
	defer db.Close()

	router := mux.NewRouter()

	router.HandleFunc("/register", handlers.RegisterUser(db)).Methods("POST")
	router.HandleFunc("/login", handlers.LoginUser(db)).Methods("POST")
	router.HandleFunc("/me", handlers.Auth).Methods("GET")

	authMux := middleware.JWTAuthMiddleware(router)

	// Create a CORS handler
	corsHandler := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Authorization", "Content-Type"},
		AllowCredentials: true,
	}).Handler(authMux)

	// Start server
	log.Print("Server starting on port 8080...")
	log.Fatal(http.ListenAndServe(":8080", corsHandler))

}
