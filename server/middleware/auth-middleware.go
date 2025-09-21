package middleware

import (
	"net/http"

	"github.com/golang-jwt/jwt/v5"
)

var jwtKey = []byte("your-secret-key")

func JWTAuthMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		publicPaths := map[string]bool{
			"/login":    true,
			"/register": true,
		}
		if publicPaths[r.URL.Path] {
			next.ServeHTTP(w, r)
			return
		}
		cookie, err := r.Cookie("token")
		if err != nil {
			http.Error(w, "Unauthorized", http.StatusUnauthorized)
			return
		}
		tokenStr := cookie.Value

		claims := &jwt.RegisteredClaims{}
		token, err := jwt.ParseWithClaims(tokenStr, claims, func(token *jwt.Token) (interface{}, error) {
			return jwtKey, nil
		})
		if err != nil || !token.Valid {
			http.Error(w, "Unauthorized", http.StatusUnauthorized)
			return
		}

		next.ServeHTTP(w, r)
	})
}
