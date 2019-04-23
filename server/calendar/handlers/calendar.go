package handlers

// import (
// 	"gopkg.in/mgo.v2/bson"
// 	"encoding/json"
// 	"fmt"
// 	"io"
// 	"net/http"
// 	"path"
// 	"strconv"
// 	"strings"
// 	"gopkg.in/mgo.v2"

// )

// // UserHeader is the header recieved from main to confirm a valid user

// const UserHeader = "X-User" 
// const ContentTypeApplicationJSON = "application/json"

// // endpoint for saving single host (get, post, patch)

// // endpoint for rendering Advocate map (get)

// // User is the decoded json X-User object
// type User struct {
// 	ID        int64          `json:"id"`
// 	UserName  string         `json:"userName"`
// 	FirstName string         `json:"firstName"`
// 	LastName  string         `json:"lastName"`
// 	Title     string         `json: "title "`
// 	PhotoURL  string         `json:"photoURL"`
// 	Session   *mgo.Session   `json:"-"`
// }
// // Result is the schema for mongoDB
// type Result struct {
// 	ID		  bson.ObjectId  `json:"id"` 
// 	UserID 	  int64     	 `json:"userID"`
// 	TimeZone  string         `json:"timeZone`
// 	Events    []*Event       `json:"events`

// }

// //Event is the event date/time and other data of calendar
// type Event struct {
// 	ID        string          `json:"id"`
// 	Title     string		  `json:"title"`
// 	Start     string		  `json:"start"`
// 	End       string		  `json:"end"`
// 	AllDay    string		  `json:"allDay"`
// 	Editable  string		  `json:"editable"`
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
// 	sess, err := mgo.Dial("127.0.0.1")
// 	if err != nil {
// 		fmt.Printf("error dialing mongo: %v\n", err)
// 	} else {
// 		fmt.Printf("connected successfully!")
// 	}
// 	data := sess.DB("mydata").C("Calendar")
// 	user.Session = sess
// 	return user
// }

// // CalendarHandler handles requests and responses made to and from the calendar
// func (user *User) CalendarHandler(w http.ResponseWriter, r *http.Request) {
// 	session := user.Session
// 	conn := session.DB("mydata").C("Calendar")
// 	results := &Result{}
// 	switch r.Method {
// 	case http.MethodGet: 
// 	var query *Result
// 	if user.Title == "Advocate" {
// 			err := conn.Find(nil).All(results)
// 		} else {
// 			query = conn.Find()
// 		}
// 			w.Header().Add("Content-Type", "application/json")
// 			w.WriteHeader(http.StatusCreated)
// 			if err := json.NewEncoder(w).Encode(query); err != nil {
// 				http.Error(w, fmt.Sprintf("Error encoding JSON: %v", err),
// 				http.StatusInternalServerError)
// 			return
// 			}
// 	}
	
// }