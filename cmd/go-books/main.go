package main

import (
	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
	"github.com/mgolebiowski/go-books/internal/handlers"
)

func main() {
	r := gin.Default()

	r.Use(static.Serve("/", static.LocalFile("./web/dist", true)))

	handlers.CreateAPI(r)

	r.Run()
}
