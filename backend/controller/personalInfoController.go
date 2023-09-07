package controller

import (
	"go-lang-basic-api/initializers"
	"go-lang-basic-api/model"
	"net/http"
	"regexp"

	"github.com/gin-gonic/gin"
)

func AddPersonalInfo(c *gin.Context) {
	var body struct {
		Email                 string
		Address               string
		PhoneNumber           string
		National_ID           string  //0922001
		HighSchool            string  //High School Name
		HighSchool_Grade      string  //A,B,C
		Grade_Scale           float64 //99.0484...
		English_Qualification string
		SocialMedia_URL       string
		Telegram_URL          string
	}
	emailRegEx := regexp.MustCompile(`^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$`)
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

	if !emailRegEx.MatchString(body.Email) {
		c.JSON(http.StatusNotFound, gin.H{"message": "Invalid Email Address", "status": false})
		return
	}
	personalInfo := model.PersonalInfo{
		User_ID:               userId,
		Email:                 body.Email,
		Address:               body.Address,
		PhoneNumber:           body.PhoneNumber,
		National_ID:           body.National_ID,
		HighSchool:            body.HighSchool,
		HighSchool_Grade:      body.HighSchool_Grade,
		Grade_Scale:           body.Grade_Scale,
		English_Qualification: body.English_Qualification,
		SocialMedia_URL:       body.SocialMedia_URL,
		Telegram_URL:          body.Telegram_URL,
	}
	if userRole != "user" {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Unauthorized", "status": false})
		return
	}
	myerr := initializers.DB.Create(&personalInfo).Error
	if myerr != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": myerr.Error, "status": false})
		return
	} else {
		c.JSON(http.StatusOK, gin.H{"messsage": "Done with creating", "status": true})
		return
	}
}
func UpdateUploadedPersonalInfo(c *gin.Context) {
	var body struct {
		Email                 string
		Address               string
		PhoneNumber           string
		National_ID           string  //0922001
		Passport_No           string  //N039580
		HighSchool            string  //High School Name
		HighSchool_Grade      string  //A,B,C
		Grade_Scale           float64 //99.0484...
		English_Qualification string
		SocialMedia_URL       string
		Telegram_URL          string
	}
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
	userId := userInstance.Id

	var personalInfo model.PersonalInfo
	if err := initializers.DB.Where("user_id=?", userId).First(&personalInfo).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Your Personal Info not found"})
		return
	}
	if err := c.BindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Error Occur"})
		return
	}
	personalInfo.Address = body.Address
	personalInfo.Email = body.Email
	personalInfo.PhoneNumber = body.PhoneNumber
	personalInfo.English_Qualification = body.English_Qualification
	personalInfo.National_ID = body.National_ID
	personalInfo.Grade_Scale = body.Grade_Scale
	personalInfo.HighSchool = body.HighSchool
	personalInfo.HighSchool_Grade = body.HighSchool_Grade
	personalInfo.English_Qualification = body.English_Qualification
	personalInfo.SocialMedia_URL = body.SocialMedia_URL
	personalInfo.Telegram_URL = body.Telegram_URL
	result := initializers.DB.Save(&personalInfo)
	//result := initializers.DB.Where("id=?", program_id).Updates(&program)
	if result == nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "cant update the personal Info",
		})
		return
	}
	if result.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Personal Info is not found",
		})
	} else {

		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Personal info is updated",
		})
		return
	}

}
func ViewPersonalInfo(c *gin.Context) {
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
	userId := userInstance.Id

	var personalInfo model.PersonalInfo
	if err := initializers.DB.Where("user_id=?", userId).First(&personalInfo).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Application not found", "status": false})
		return
	} else {
		c.JSON(http.StatusOK, gin.H{"message": personalInfo, "status": true})
		return
	}

}
