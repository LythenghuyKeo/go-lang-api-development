package routes

import (
	"go-lang-basic-api/controller"
	"go-lang-basic-api/middleware"

	"github.com/gin-gonic/gin"
)

func SetUpProgramRoute(c *gin.RouterGroup) {
	programroute := c.Group("/program")

	{
		programroute.Use(middleware.RequireAuth)
		programroute.GET("/available_program", controller.GetProgram)
		programroute.POST("/create_program", controller.CreateNewProgram)
		programroute.DELETE("/delete_program/:id", controller.DeleteProgram)
		programroute.PUT("/update_program/:id", controller.UpdateProgram)
	}
}
