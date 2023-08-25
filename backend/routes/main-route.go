package routes

import (
	"go-lang-basic-api/controller"
	"go-lang-basic-api/middleware"

	"github.com/gin-gonic/gin"
)

func SetUpMainRoute(c *gin.RouterGroup) {
	mainroute := c.Group("/")
	{
		mainroute.Use(middleware.RequireAuth)
		mainroute.GET("home", controller.Validate)
	}
}
