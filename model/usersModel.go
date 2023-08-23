package model

import "gorm.io/gorm"

type User struct {
	gorm.Model
	Id       int    `gorm:"primaryKey;autoIncrement:true;column:id"`
	Name     string `gorm:"uniqueIndex:true;not null;column:name;unique"`
	Email    string `gorm:"uniqueIndex:true;not null;column:email;unique"`

	Password string `gorm:"uniqueIndex:false;not null;column:password;"`
	Role_ID  int
	Role     Role
}
