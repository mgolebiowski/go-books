package clients

import (
	"encoding/json"
	"fmt"
	"net/http"
)

type ResponseISBN struct {
	Revision int `json:"revision"`
}

func GetRevisionFromISBN(isbn string) (int, error) {
	u := fmt.Sprintf("https://openlibrary.org/isbn/%s.json", isbn)
	res, err := http.Get(u)
	if err != nil {
		return 0, err
	}
	defer res.Body.Close()

	var response ResponseISBN
	if err := json.NewDecoder(res.Body).Decode(&response); err != nil {
		return 0, err
	}

	return response.Revision, nil
}
