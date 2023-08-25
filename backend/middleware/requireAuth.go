package middleware

import (
	"fmt"
	"go-lang-basic-api/initializers"
	"go-lang-basic-api/model"
	"net/http"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

func RequireAuth(c *gin.Context) {

	tokenString, err := c.Cookie("Authorization")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Please log in or register"})
	}
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		// Don't forget to validate the alg is what you expect:
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
		}

		// hmacSampleSecret is a []byte containing your secret, e.g. []byte("my_secret_key")
		return []byte(os.Getenv("SECRET")), nil
	})
	if claim, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		if float64(time.Now().Unix()) > float64(claim["exp"].(float64)) {
			c.AbortWithStatus(http.StatusUnauthorized)
		}
		var user model.User
		initializers.DB.Preload("Role").First(&user, "email = ?", claim["email"])
		if user.Email == "" {
			c.JSON(http.StatusBadRequest, gin.H{"message": "Please log in or register"})
		}
		//Attach to the request
		c.Set("user", user)
		c.Next()
		fmt.Println(claim["foo"], claim["nbf"])
	} else {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Please log in or register"})
	}

}
