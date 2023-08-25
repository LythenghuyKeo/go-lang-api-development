package main

import (
	"go-lang-basic-api/initializers"
	"go-lang-basic-api/routes"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func init() {
	initializers.LoadEnvVariables()
	initializers.ConnectToDB()
	initializers.SyncDatabase()
}
func main() {
	router := gin.Default()
	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"http://localhost:5173"}
	config.AllowMethods = []string{"GET", "POST", "PUT", "DELETE"}
	config.AllowHeaders = []string{"Origin,Content-Type,Accept"}

	//Authentication route
	authroute := router.Group("/")
	routes.SetupAuthRoute(authroute)

	//Home Page route
	mainroute := router.Group("/")
	routes.SetUpMainRoute(mainroute)

	//Program Page Route
	programroute := router.Group("/api")
	routes.SetUpProgramRoute(programroute)

	router.Run()
}
