package routes

import (
	"go-lang-basic-api/controller"
	"go-lang-basic-api/middleware"

	"github.com/gin-gonic/gin"
)

func SetUpDocumentRoute(c *gin.RouterGroup) {
	document := c.Group("/document")
	{
		document.Use(middleware.RequireAuth)
		document.POST("/upload", controller.ApplyApplication)
		document.PUT("/update", controller.UpdateUploadedDocument)
		document.GET("/view", controller.ViewDocument)

	}
}
