package controller

import (
	"go-lang-basic-api/initializers"
	"go-lang-basic-api/model"
	"net/http"

	"github.com/gin-gonic/gin"
)

// // func UpdateUploadedDocument(c *gin.Context) {
// // 	var body struct {
// // 		Document_type string `json:document_type`
// // 		Document_file []byte `json:document_file`
// // 	}
// // 	user, err := c.Get("user")
// // 	if !err {
// // 		c.JSON(http.StatusNotFound, gin.H{"error": "Notauthorized"})
// // 		return
// // 	}
// // 	userInstance, ok := user.(model.User)
// // 	if !ok {
// // 		c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server error"})
// // 		return
// // 	}
// // 	userId := userInstance.Id

// // 	var document model.Document
// // 	if err := initializers.DB.Where("user_id=?", userId).First(&document).Error; err != nil {
// // 		c.JSON(http.StatusBadRequest, gin.H{"message": "Your Personal Info not found"})
// // 		return
// // 	}
// // 	document.Document_file = body.Document_file
// // 	document.Document_type = body.Document_type

// // 	result := initializers.DB.Save(&document)
// // 	//result := initializers.DB.Where("id=?", program_id).Updates(&program)
// // 	if result == nil {
// // 		c.JSON(http.StatusBadRequest, gin.H{
// // 			"message": "cant update the document",
// // 		})
// // 		return
// // 	}
// // 	if result.RowsAffected == 0 {
// // 		c.JSON(http.StatusBadRequest, gin.H{
// // 			"message": "Document is not found",
// // 		})
// // 	} else {

// // 		c.JSON(http.StatusBadRequest, gin.H{
// // 			"message": "Document is updated",
// // 		})
// // 		return
// // 	}

// // }
func ViewDocument(c *gin.Context) {
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
	userId := userInstance.Id

	var document model.Document
	if err := initializers.DB.Where("user_id=?", userId).First(&document).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Document not found", "status": false})
		return
	} else {
		c.JSON(http.StatusOK, gin.H{"message": document, "status": true})
		return
	}
}
func UploadDocument(c *gin.Context) {
	var body struct {
		User_id            int
		Transcript         string `json:transcript`
		IdentityDoc        string `json:identitydoc`
		EnglishCertificate string `json:englishcertificate`
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
	userId := userInstance.Id
	if err := c.BindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Error Occur", "status": false})
		return
	}
	document := model.Document{
		User_ID:            userId,
		Transcript:         body.Transcript,
		EnglishCertificate: body.EnglishCertificate,
		IdentityDoc:        body.IdentityDoc,
	}
	initializers.DB.Create(&document)

	c.JSON(http.StatusOK, gin.H{"message": "Done with uploading", "status": true})
}
