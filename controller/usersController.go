package controller

import (
	"go-lang-basic-api/initializers"
	"go-lang-basic-api/model"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
)

func SignUp(c *gin.Context) {
	var body struct {
		Email    string `json:email`
		Name     string `json:name`
		Password string `json:password`
		Role_id  int    `json:role_id`
	}
	if c.Bind(&body) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "failed authentication",
		})
		return
	}
	//Hashing the password
	hash_pwd, err := bcrypt.GenerateFromPassword([]byte(body.Password), 10)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to hash the password",
		})
	}
	user := model.User{Email: body.Email, Name: body.Name, Password: strings.TrimLeft(string(hash_pwd), " "), Role_ID: body.Role_id}
	result := initializers.DB.Create(&user)
	if result == nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "cant create User",
		})
		return
	} else {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "can create User",
		})
		return
	}
}
func LogIn(c *gin.Context) {
	var body struct {
		Email    string `json:email`
		Password string `json:password`
	}
	if c.Bind(&body) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Invalid body re-enter again",
		})
	}
	var user model.User

	initializers.DB.First(&user, "email = ?", body.Email)
	is_password := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(body.Password))
	// c.JSON(http.StatusBadRequest, gin.H{"message": is_password})
	// return
	if is_password != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Please enter password/email again"})
		return
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS512, jwt.MapClaims{
		"sub": user.ID,
		"exp": time.Now().Add(time.Hour * 24 * 1).Unix(),
	})
	tokenString, err := token.SignedString([]byte(os.Getenv("SECRET")))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid email or password"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"token": tokenString})

}
