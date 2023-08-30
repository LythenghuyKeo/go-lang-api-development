package model

import (
	"time"

	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Id    int    `gorm:"primaryKey;autoIncrement:true;column:id;foreignKey:user_id"`
	Name  string `gorm:"uniqueIndex:true;not null;column:name;unique"`
	Email string `gorm:"uniqueIndex:true;not null;column:email;unique"`

	Password    string `gorm:"uniqueIndex:false;not null;column:password;"`
	Role_ID     int
	Role        Role `gorm:"foreignkey:Role_ID;references:Id"`
	isSubmitted bool
}
type Role struct {
	gorm.Model
	Id        int    `gorm:"primaryKey;column:id;foreignKey:role_id"`
	Role_Name string `gorm:"not null;column:role_name;unique"`
}

type Document struct {
	gorm.Model
	Id            int    `gorm:"primaryKey;column:id;"`
	User_ID       int    `gorm:"not null;column:user_id;unique"`
	Document_type string `gorm:"not null;column:document_type"`
	Document_file string `gorm:"not null;column:document_file"`
	User          User
}

type PersonalInfo struct {
	gorm.Model
	Id      int    `gorm:"primaryKey;autoIncrement:true;column:id"`
	User_ID int    `gorm:"not null;column:user_id;unique"`
	Email   string `gorm:"uniqueIndex:true;not null;column:email;unique"`
	Address string `gorm:"uniqueIndex:true;not null;column:address;unique"`
	//DateOfBirth
	PhoneNumber           string  `gorm:"uniqueIndex:true;not null;column:phonenumber;unique"`
	National_ID           string  `gorm:"uniqueIndex:true;not null;column:national_id;unique"` //0922001
	Passport_No           string  `gorm:"uniqueIndex:true;not null;column:passport_no;unique"` //N039580
	HighSchool            string  `gorm:"not null;column:highschool_name;"`                    //High School Name
	HighSchool_Grade      string  `gorm:";not null;column:highschool_grade;"`                  //A,B,C
	Grade_Scale           float64 `gorm:"not null;column:grade_scale;"`                        //99.0484...
	English_Qualification string  `gorm:"not null;column:english_qualification"`
	SocialMedia_URL       string  `gorm:"uniqueIndex:true;not null;column:socialmedia_url;unique"` //facebook,instagram,telegram
	Telegram_URL          string  `gorm:"uniqueIndex:true;not null;column:telegram_url;unique"`    //
	User                  User    `gorm:"foreignkey:User_ID;references:Id"`
}

type Status string

const (
	PENDING  Status = "pending"
	ACCEPTED Status = "accepted"
	REJECTED Status = "rejected"
)

type Program struct {
	gorm.Model
	Id                   int       `gorm:"primaryKey;autoIncrement:true;column:id;foreignKey:program_id"`
	Program_name         string    `gorm:"uniqueIndex:true;not null;column:program_name;unique"`
	Description          string    `gorm:"not null;column:description"`
	Application_deadline time.Time `gorm:"not null;column:deadline"`
}

type Application struct {
	gorm.Model
	Id          int       `gorm:"primaryKey;autoIncrement:true;column:id"`
	Program_ID  int       `gorm:"not null;column:program_id;unique:false"`
	User_ID     int       `gorm:"not null;column:user_id;unique"`
	Status      string    `gorm:not null;column:status;default:'pending'"`
	SubmittedAt time.Time `gorm:not null;column:submittedAt"`
	RejectedAt  time.Time `gorm:not null:false;column:rejectedAt"`
	AccpetedAt  time.Time `gorm:not null:false;column:acceptedAt"`
	Program     Program   `gorm:"foreignkey:Program_ID;references:Id"`
	User        User      `gorm:"foreignKey:User_ID;references:Id"`
}
