package main

import (
	"go-lang-basic-api/controller"
	"go-lang-basic-api/initializers"

	"github.com/gin-gonic/gin"
)

func init() {
	initializers.LoadEnvVariables()
	initializers.ConnectToDB()
	initializers.SyncDatabase()
}
func main() {
	router := gin.Default()
	router.POST("/signup", controller.SignUp)
	router.POST("/login", controller.LogIn)
	router.Run()
}
