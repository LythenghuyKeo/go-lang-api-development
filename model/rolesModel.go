package model

import "gorm.io/gorm"

type Role struct {
	gorm.Model
	Id        int    `gorm:"primaryKey;column:id"`
	Role_Name string `gorm:"not null:true;uniqueIndex;column:role_name"`
}
