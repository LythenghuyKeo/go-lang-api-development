package routes

import (
	"go-lang-basic-api/controller"

	"github.com/gin-gonic/gin"
)

func SetupAuthRoute(c *gin.RouterGroup) {
	auth := c.Group("/")
	{
		auth.POST("signup", controller.SignUp)
		auth.POST("login", controller.LogIn)
		auth.POST("logout", controller.LogOut)
	}
}
