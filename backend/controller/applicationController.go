package controller

import (
	"go-lang-basic-api/initializers"
	"go-lang-basic-api/model"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
)

func ApplyApplication(c *gin.Context) {
	var body struct {
		Id         int
		Program_ID int `json:program_id`
		User_ID    int
	}
	user, err := c.Get("user")
	if !err {
		c.JSON(http.StatusNotFound, gin.H{"message": "Notauthorized", "status": false})
		return
	}
	userInstance, ok := user.(model.User)
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Internal Server error", "status": false})
		return
	}
	userRole := userInstance.Role.Role_Name
	userId := userInstance.Id
	if err := c.BindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Error Occur", "status": false})
		return
	}
	application := model.Application{Program_ID: body.Program_ID, User_ID: userId, SubmittedAt: time.Now(), Status: string(model.PENDING)}
	if userRole != "user" {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Unauthorized", "status": false})
		return
	}
	initializers.DB.Create(&application)

	c.JSON(http.StatusOK, gin.H{"messsage": "Done with creating", "status": true})

}

func AcceptApplication(c *gin.Context) {
	user, err := c.Get("user")
	if !err {
		c.JSON(http.StatusNotFound, gin.H{"error": "Notauthorized", "status": false})
		return
	}
	userInstance, ok := user.(model.User)
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server error", "status": false})
		return
	}
	userRole := userInstance.Role.Role_Name
	if userRole != "admin" {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Unauthorized", "status": false})
		return
	}
	id := c.Param("id")
	application_id, _ := strconv.Atoi(id)

	var application model.Application
	if err := initializers.DB.First(&application, application_id).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Program not found", "status": false})
		return
	}
	if application.Status != "pending" {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Application is already mark as accpeted and rejected", "status": false})
		return
	}
	application.Status = string(model.ACCEPTED)
	application.AccpetedAt = time.Now()
	result := initializers.DB.Save(&application)
	//result := initializers.DB.Where("id=?", program_id).Updates(&program)
	if result == nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "cant accept the application", "status": false,
		})
		return
	}
	if result.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Application is not found", "status": false,
		})
	} else {

		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Application is accepted", "status": true,
		})
		return
	}

}
func RejectApplication(c *gin.Context) {
	user, err := c.Get("user")
	if !err {
		c.JSON(http.StatusNotFound, gin.H{"error": "Notauthorized", "status": false})
		return
	}
	userInstance, ok := user.(model.User)
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server error", "status": false})
		return
	}
	userRole := userInstance.Role.Role_Name
	if userRole != "admin" {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Unauthorized", "status": false})
		return
	}
	id := c.Param("id")
	application_id, _ := strconv.Atoi(id)

	var application model.Application
	if err := initializers.DB.First(&application, application_id).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Program not found", "status": false})
		return
	}
	if application.Status != "pending" {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Application is already mark as accpeted and rejected", "status": false})
		return
	}
	application.Status = string(model.REJECTED)
	application.RejectedAt = time.Now()
	result := initializers.DB.Save(&application)
	//result := initializers.DB.Where("id=?", program_id).Updates(&program)
	if result == nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "cant reject the application", "status": false,
		})
		return
	}
	if result.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Application is not found", "status": false,
		})
	} else {

		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Application is rejected", "status": true,
		})
		return
	}

}
func ViewAppliedApplication(c *gin.Context) { // Remodify by displaying all the
	var my_info struct {
		Name           string
		Application_ID int
		Program_Name   string
		Email          string
		Status         string
		Program_ID     int
	}
	user, err := c.Get("user")
	if !err {
		c.JSON(http.StatusNotFound, gin.H{"error": "Notauthorized"})
		return
	}
	userInstance, ok := user.(model.User)
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server error", "status": false})
		return
	}
	userId := userInstance.Id
	userRole := userInstance.Role.Role_Name

	var application model.Application
	if userRole == "admin" {
		c.JSON(http.StatusOK, gin.H{"message": "", "status": false, "role": userRole})
	} else {
		if err := initializers.DB.Preload("Program").Preload("User").Where("user_id=?", userId).First(&application).Error; err != nil {
			application.User.Password = ""
			c.JSON(http.StatusBadRequest, gin.H{"message": "Application not found", "status": false, "role": userRole})
			return
		} else {
			my_info.Program_ID = application.Program.Id
			my_info.Application_ID = application.Id
			my_info.Program_Name = application.Program.Program_name
			my_info.Name = application.User.Name
			my_info.Email = application.User.Email
			my_info.Status = application.Status
			c.JSON(http.StatusOK, gin.H{"message": my_info, "status": true, "role": userRole})
		}
	}
}
func GetAllApplication(c *gin.Context) {
	user, err := c.Get("user")
	if !err {
		c.JSON(http.StatusNotFound, gin.H{"error": "Notauthorized"})
		return
	}
	userInstance, ok := user.(model.User)
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server error"})
		return
	}
	userRole := userInstance.Role.Role_Name
	if userRole != "admin" {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Unauthorized"})
		return
	}
	application := []model.Application{}
	result := initializers.DB.Preload("Program").Preload("User").Find(&application)
	for i := 0; i < len(application); i++ {
		application[i].User.Password = ""
		mytime := application[i].SubmittedAt.Format(time.RFC822)
		application[i].SubmittedAt, _ = time.Parse(time.RFC822, string(mytime))
	}
	if result == nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "cant find the program", "status": false,
		})
		return
	}
	c.JSON(http.StatusBadRequest, gin.H{"message": application, "status": true})
	return
}
func GetMyStudentApplication(c *gin.Context) {
	user, err := c.Get("user")
	if !err {
		c.JSON(http.StatusNotFound, gin.H{"error": "Notauthorized"})
		return
	}
	userInstance, ok := user.(model.User)
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server error", "status": false})
		return
	}
	userRole := userInstance.Role.Role_Name
	if userRole != "admin" {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Unauthorized", "status": false})
		return
	} else {
		userId := c.Param("id")
		var Info struct {
			ApplicationID         int
			Name                  string
			Email                 string
			Address               string
			Transcript            string
			IdentityDoc           string
			EnglishCertificate    string
			National_ID           string
			Passport              string
			PhoneNumber           string
			HighSchool            string
			HighSchool_Grade      string
			Grade_Scale           float64
			English_Qualification string
			SocialMedia_URL       string
			Telegram_URL          string
			Status                string
			Program               string
			SubmittedAt           time.Time
		}

		var myapplication model.Application
		var mydocument model.Document
		var mypersonalInfo model.PersonalInfo
		if err := initializers.DB.Preload("User").Where("user_id=?", userId).First(&mypersonalInfo).Error; err != nil {
			Info.Address = ""
			Info.Email = ""
			Info.Name = ""
			Info.National_ID = ""
			Info.PhoneNumber = ""
			Info.HighSchool = ""
			Info.HighSchool_Grade = ""
			Info.Grade_Scale = 0
			Info.English_Qualification = ""
			Info.SocialMedia_URL = ""
			Info.Telegram_URL = ""

		} else {
			Info.Address = mypersonalInfo.Address
			Info.Email = mypersonalInfo.Email
			Info.Name = mypersonalInfo.User.Name
			Info.National_ID = mypersonalInfo.National_ID
			Info.PhoneNumber = mypersonalInfo.PhoneNumber
			Info.HighSchool = mypersonalInfo.HighSchool
			Info.HighSchool_Grade = mypersonalInfo.HighSchool_Grade
			Info.Grade_Scale = mypersonalInfo.Grade_Scale
			Info.English_Qualification = mypersonalInfo.English_Qualification
			Info.SocialMedia_URL = mypersonalInfo.SocialMedia_URL
			Info.Telegram_URL = mypersonalInfo.Telegram_URL

		}
		if err := initializers.DB.Preload("User").Preload("Program").Where("user_id=?", userId).First(&myapplication).Error; err != nil {
			Info.Status = "pending"

		} else {
			Info.ApplicationID = myapplication.Id
			Info.Program = myapplication.Program.Program_name
			Info.SubmittedAt = myapplication.SubmittedAt
			Info.Name = myapplication.User.Name
			Info.Status = myapplication.Status
		}

		if err := initializers.DB.Where("user_id=?", userId).First(&mydocument).Error; err != nil {
			Info.Transcript = ""
			Info.EnglishCertificate = ""
			Info.IdentityDoc = ""
		} else {
			Info.Transcript = "transcript_1"
			Info.EnglishCertificate = "eng_cert1"
			Info.IdentityDoc = "identity_doc1"
		}
		c.JSON(http.StatusOK, gin.H{"message": Info, "status": true})
	}
}
