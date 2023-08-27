package routes

import (
	"go-lang-basic-api/controller"
	"go-lang-basic-api/middleware"

	"github.com/gin-gonic/gin"
)

func SetUpPersonalInfoRoute(c *gin.RouterGroup) {
	personal_info := c.Group("/personal_info")
	{
		personal_info.Use(middleware.RequireAuth)
		personal_info.POST("/upload", controller.AddPersonalInfo)
		personal_info.GET("/view", controller.ViewPersonalInfo)
		personal_info.PUT("/update", controller.UpdateUploadedPersonalInfo)

	}
}
