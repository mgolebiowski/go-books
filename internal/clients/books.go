package clients

import (
	"encoding/json"
	"fmt"
	"net/http"
)

type ResponseBooks struct {
	Kind       string `json:"kind"`
	TotalItems int    `json:"totalItems"`
	Items      []ResponseBook
}

type ResponseBook struct {
	Kind       string `json:"kind"`
	ID         string `json:"id"`
	VolumeInfo struct {
		Title          string `json:"title"`
		PageCount      int    `json:"pageCount"`
		MaturityRating string `json:"maturityRating"`
		Description    string `json:"description"`
		ImageLinks     struct {
			SmallThumbnail string `json:"smallThumbnail"`
		} `json:"imageLinks"`
		IndustryIdentifiers []struct {
			Type       string `json:"type"`
			Identifier string `json:"identifier"`
		} `json:"industryIdentifiers"`
	} `json:"volumeInfo"`
	SaleInfo struct {
		ListPrice Price `json:"listPrice"`
	} `json:"saleInfo"`
}

type Price struct {
	Amount   float64 `json:"amount"`
	Currency string  `json:"currencyCode"`
}

type Book struct {
	ID          string `json:"id"`
	ISBN        string `json:"isbn"`
	ImageUrl    string `json:"imageUrl"`
	Description string `json:"description"`
	Title       string `json:"title"`
	PageCount   int    `json:"pageCount"`
	ListedPrice Price  `json:"listedPrice"`
	RevisionNum int    `json:"revisionNum"`
}

func GetBooks(startIndex int, query string) ([]Book, error) {
	u := fmt.Sprintf("https://www.googleapis.com/books/v1/volumes?q=%s&startIndex=%d&maxResults=10", query, startIndex)
	res, err := http.Get(u)
	if err != nil {
		return nil, err
	}
	defer res.Body.Close()

	var response ResponseBooks
	if err := json.NewDecoder(res.Body).Decode(&response); err != nil {
		return nil, err
	}

	var books []Book
	for _, item := range response.Items {
		if item.VolumeInfo.MaturityRating != "NOT_MATURE" {
			continue
		}
		book := Book{
			ID:          item.ID,
			ImageUrl:    item.VolumeInfo.ImageLinks.SmallThumbnail,
			Title:       item.VolumeInfo.Title,
			PageCount:   item.VolumeInfo.PageCount,
			ListedPrice: item.SaleInfo.ListPrice,
			Description: item.VolumeInfo.Description,
		}

		if len(item.VolumeInfo.IndustryIdentifiers) > 0 {
			book.ISBN = item.VolumeInfo.IndustryIdentifiers[0].Identifier
		}

		books = append(books, book)
	}

	return books, nil
}

func GetBookById(id string) (Book, error) {
	u := fmt.Sprintf("https://www.googleapis.com/books/v1/volumes/%s", id)
	res, err := http.Get(u)
	if err != nil {
		return Book{}, err
	}
	defer res.Body.Close()

	var response ResponseBook
	if err := json.NewDecoder(res.Body).Decode(&response); err != nil {
		return Book{}, err
	}

	book := Book{
		ID:          response.ID,
		ImageUrl:    response.VolumeInfo.ImageLinks.SmallThumbnail,
		Title:       response.VolumeInfo.Title,
		PageCount:   response.VolumeInfo.PageCount,
		ListedPrice: response.SaleInfo.ListPrice,
		Description: response.VolumeInfo.Description,
	}

	if len(response.VolumeInfo.IndustryIdentifiers) > 0 {
		book.ISBN = response.VolumeInfo.IndustryIdentifiers[0].Identifier
	}

	return book, nil
}
