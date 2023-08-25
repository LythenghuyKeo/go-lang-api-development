package model

import (
	"time"

	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Id    int    `gorm:"primaryKey;autoIncrement:true;column:id"`
	Name  string `gorm:"uniqueIndex:true;not null;column:name;unique"`
	Email string `gorm:"uniqueIndex:true;not null;column:email;unique"`

	Password string `gorm:"uniqueIndex:false;not null;column:password;"`
	Role_ID  int
	Role     Role `gorm:"foreignkey:Role_ID;references:Id"`
}
type Role struct {
	gorm.Model
	Id        int    `gorm:"primaryKey;column:id;foreignKey:role_id"`
	Role_Name string `gorm:"not null;column:role_name;unique"`
}

// type Document struct {
// 	gorm.Model
// 	id             int `gorm:"primaryKey;column:id;foreignKey:role_id"`
// 	Applicaton_id int
// 	Document_type  string
// 	Document_file  string
// }

// type PersonalInfo struct {
// 	gorm.Model
// 	Id                   int     `gorm:"primaryKey;autoIncrement:true;column:id"`
// 	User_ID              int     `gorm:"primaryKey;column:id;foreignKey:role_id"`
// 	Email                string  `gorm:"uniqueIndex:true;not null;column:email;unique"`
// 	Address              string  `gorm:"uniqueIndex:true;not null;column:email;unique"`
// 	PhoneNumber          string  `gorm:"uniqueIndex:true;not null;column:email;unique"`
// 	National_ID_Card_No  string  `gorm:"uniqueIndex:true;not null;column:email;unique"` //0922001
// 	Passport_No          string  `gorm:"uniqueIndex:true;not null;column:email;unique"` //N039580
// 	HighSchool           string  `gorm:"uniqueIndex:true;not null;column:email;unique"` //High School Name
// 	HighSchool_Grade     string  `gorm:"uniqueIndex:true;not null;column:email;unique"` //A,B,C
// 	HighSchool_Scale     float64 `gorm:"uniqueIndex:true;not null;column:email;unique"` //99.0484...
// 	EnglishQualification string  `gorm:"uniqueIndex:true;not null;column:email;unique"`
// 	SocialMedia_URL      string  `gorm:"uniqueIndex:true;not null;column:email;unique"` //facebook,instagram,telegram
// 	Telegram_URL         string  `gorm:"uniqueIndex:true;not null;column:email;unique"` //
// 	User                 User    `gorm:"foreignkey:User_ID;references:Id"`
// }

type Program struct {
	gorm.Model
	Id                   int       `gorm:"primaryKey;autoIncrement:true;column:id"`
	Program_name         string    `gorm:"uniqueIndex:true;not null;column:program_name;unique"`
	Description          string    `gorm:"not null;column:description"`
	Application_deadline time.Time `gorm:"not null;column:deadline"`
}

// type Application struct {`gorm:"uniqueIndex:true;not null;column:program_name;unique"`
// 	gorm.Model
// 	Id          int
// 	Program_ID  int
// 	User_ID     int
// 	Status      string
// 	submittedAt time.Time
// 	rejectedAt time.Time
// 	accpetedAt time.Time
// }
