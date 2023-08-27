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
		c.JSON(http.StatusNotFound, gin.H{"error": "Notauthorized"})
		return
	}
	userInstance, ok := user.(model.User)
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server error"})
		return
	}
	userRole := userInstance.Role.Role_Name
	userId := userInstance.Id
	if err := c.BindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Error Occur"})
		return
	}
	application := model.Application{Program_ID: body.Program_ID, User_ID: userId, SubmittedAt: time.Now(), Status: string(model.PENDING)}
	if userRole != "user" {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Unauthorized"})
		return
	}
	initializers.DB.Create(&application)
	c.JSON(http.StatusOK, gin.H{"messsage": "Done with creating"})
}

func AcceptApplication(c *gin.Context) {
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
	id := c.Param("id")
	application_id, _ := strconv.Atoi(id)

	var application model.Application
	if err := initializers.DB.First(&application, application_id).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Program not found"})
		return
	}
	application.Status = string(model.ACCEPTED)
	application.AccpetedAt = time.Now()
	result := initializers.DB.Save(&application)
	//result := initializers.DB.Where("id=?", program_id).Updates(&program)
	if result == nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "cant accept the application",
		})
		return
	}
	if result.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Application is not found",
		})
	} else {

		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Application is accepted",
		})
		return
	}

}
func RejectApplication(c *gin.Context) {
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
	id := c.Param("id")
	application_id, _ := strconv.Atoi(id)

	var application model.Application
	if err := initializers.DB.First(&application, application_id).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Program not found"})
		return
	}
	if application.Status != "pending" {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Application is already mark as accpeted and rejected"})
		return
	}
	application.Status = string(model.REJECTED)
	application.RejectedAt = time.Now()
	result := initializers.DB.Save(&application)
	//result := initializers.DB.Where("id=?", program_id).Updates(&program)
	if result == nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "cant reject the application",
		})
		return
	}
	if result.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Application is not found",
		})
	} else {

		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Application is rejected",
		})
		return
	}

}
func ViewAppliedApplication(c *gin.Context) { // Remodify by displaying all the
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

	var application model.Application
	if err := initializers.DB.Where("user_id=?", userId).First(&application).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Application not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": application})
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
	}
	if result == nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "cant find the program",
		})
		return
	}
	c.JSON(http.StatusBadRequest, gin.H{"message": application})
	return
}
