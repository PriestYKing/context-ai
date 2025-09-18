package models

type User struct {
	ID      uint   `json:"id" gorm:"primaryKey"`
	ClerkID string `json:"clerk_id" gorm:"uniqueIndex;not null"`
	Email   string `json:"email" gorm:"uniqueIndex"`
	FirstName string `json:"first_name"`
	LastName string `json:"last_name"`
	Username string 
}
