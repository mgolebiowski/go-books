package handlers

import "github.com/gin-gonic/gin"

func CreateAPI(r *gin.Engine) {
	api := r.Group("api")
	{
		api.GET("/books", getBooks)
	}
}
