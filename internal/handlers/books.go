package handlers

import (
	"github.com/gin-gonic/gin"

	"github.com/mgolebiowski/go-books/internal/clients"
)

func getBooks(c *gin.Context) {
	books, err := clients.GetBooks(0, "nosql")
	if err != nil {
		c.JSON(500, gin.H{
			"error": err.Error(),
		})
		return
	}

	// this api was down most of the day I was writing this code, now it takes ~1s for each request, so I'm commenting it out
	// for i, book := range books {
	// 	revision, err := clients.GetRevisionFromISBN(book.ISBN)
	// 	if err == nil {
	// 		books[i].RevisionNum = revision
	// 	}
	// }

	c.JSON(200, books)
}
