package routes

import (
	"go-lang-basic-api/controller"
	"go-lang-basic-api/middleware"

	"github.com/gin-gonic/gin"
)

func SetUpApplicationRoute(c *gin.RouterGroup) {
	application := c.Group("/application")
	{
		application.Use(middleware.RequireAuth)
		application.POST("/apply", controller.ApplyApplication)
		application.PUT("/:id/accepted", controller.AcceptApplication)
		application.PUT("/:id/rejected", controller.RejectApplication)
		application.GET("/view_application", controller.GetAllApplication)
		application.GET("/my_application", controller.ViewAppliedApplication)
		application.GET("/get_all_student_application/:id", controller.GetMyStudentApplication)

	}
}
