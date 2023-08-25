package controller

import (
	"go-lang-basic-api/initializers"
	"go-lang-basic-api/model"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
)

func CreateNewProgram(c *gin.Context) {
	var body struct {
		Program_name string `json:program_name`
		Description  string `json:description`
		NumberOfDays int    `json:numberOfDays`
	}
	user, err := c.Get("user")
	if !err {
		c.JSON(http.StatusNotFound, gin.H{"error": "Not authorized"})
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
	if c.Bind(&body) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Invalid body re-enter again",
		})
		return
	}
	// dateInput := body.Application_deadline
	// //parsedTime, timeError := time.Parse(time.RFC3339, dateInput)
	// if timeError != nil {
	// 	c.JSON(http.StatusBadRequest, gin.H{"messsage": timeError})
	// }

	program := model.Program{Program_name: body.Program_name, Description: body.Description, Application_deadline: time.Now().AddDate(0, 0, body.NumberOfDays)}
	initializers.DB.Create(&program)
	c.JSON(http.StatusOK, gin.H{"messsage": "Done with creating"})

}
func DeleteProgram(c *gin.Context) {
	user, err := c.Get("user")
	if !err {
		c.JSON(http.StatusNotFound, gin.H{"error": "Not authorized"})
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
	program_id, _ := strconv.Atoi(id)
	program := model.Program{}
	result := initializers.DB.Unscoped().Where("id=?", program_id).Delete(&program)
	if result == nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "cant delete program",
		})
		return
	}
	if result.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Program is not found",
		})
	} else {

		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Program is deleted",
		})
		return
	}
}
func GetProgram(c *gin.Context) {
	program := []model.Program{}
	result := initializers.DB.Find(&program)
	if result == nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "cant find the program",
		})
		return
	}
	c.JSON(http.StatusBadRequest, gin.H{"message": program})
	return

}

func UpdateProgram(c *gin.Context) {
	var body struct {
		Program_name string `json:program_name`
		Description  string `json:description`
		NumberOfDays int    `json:numberOfDays`
	}
	user, err := c.Get("user")
	if !err {
		c.JSON(http.StatusNotFound, gin.H{"error": "Not authorized"})
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
	program_id, _ := strconv.Atoi(id)
	//my_program := model.Program{Id: program_id}
	program := model.Program{Id: program_id, Program_name: body.Program_name, Description: body.Description, Application_deadline: time.Now().AddDate(0, 0, body.NumberOfDays)}
	// initializers.DB.First(&my_program)
	// my_program.Program_name = body.Program_name
	// my_program.Description = body.Description
	// my_program.Application_deadline = time.Now().AddDate(0, 0, body.NumberOfDays)
	result := initializers.DB.Save(&program)
	//result := initializers.DB.Where("id=?", program_id).Updates(&program)
	if result == nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "cant update program",
		})
		return
	}
	if result.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Program is not found",
		})
	} else {

		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Program is updated",
		})
		return
	}

}
