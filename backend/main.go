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
	initializers.SyncDatabase()
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

	//Application Page Route
	applicationroute := router.Group("/api")
	routes.SetUpApplicationRoute(applicationroute)

	//Personal Info Page Route
	personalInforoute := router.Group("/api")
	routes.SetUpPersonalInfoRoute(personalInforoute)

	//Document Page route
	documentroute := router.Group("/api")
	routes.SetUpDocumentRoute(documentroute)

	router.Run()
}
