package handlers

// import (
// 	"encoding/json"
// 	"fmt"
// 	"io"
// 	"net/http"
// 	"path"
// 	"strconv"
// 	"strings"
// 	"time"
// 	"sort"

// )

// // UserHeader is the header recieved from main to confirm a valid user
// const UserHeader = "X-User" 
// const ContentTypeApplicationJSON = "application/json"

// // endpoint for saving single host (get, post, patch)

// // endpoint for rendering Advocate map (get)

// // User is the decoded json X-User object
// type User struct {
// 	ID        int64  `json:"id"`
// 	UserName  string `json:"userName"`
// 	FirstName string `json:"firstName"`
// 	LastName  string `json:"lastName"`
// 	Title     string `json: "title"`
// 	PhotoURL  string `json:"photoURL"`
// }

// // CurrentUser validates and returns user
// func CurrentUser(w http.ResponseWriter, r *http.Request) *User{
// 	header := r.Header.Get(UserHeader) 
// 	// check to make sure valid user
// 	if len(header) == 0 || header != "X-User" {
// 		http.Error(w, fmt.Sprintf("invalid user"), http.StatusUnauthorized)
// 		return nil
// 	}
// 	// check to make sure contains json
// 	if !strings.HasPrefix(header, ContentTypeApplicationJSON) {
// 		http.Error(w, fmt.Sprintf("Could not read new User, mismatched type: %v,", http.StatusUnsupportedMediaType), 415)
// 		return nil
// 	}	
// 	user := &User{}
// 	if err := json.NewDecoder(r.Body).Decode(user); err != nil {
// 		http.Error(w, fmt.Sprintf("Error decoding JSON: %v", err),
// 			http.StatusBadRequest)
// 		return nil
// 	}
// 	return user
// }

// // CalendarHandler handles requests and responses made to and from the calendar
// func (user *User) CalendarHandler(w http.ResponseWriter, r *http.Request) {
	

// }