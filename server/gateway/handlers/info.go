package handlers

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"path"
	"strconv"
	"strings"
	"time"
	"gopkg.in/mgo.v2"
)

const ContentTypeHeader = "Content-Type"
const ContentTypeApplicationJSON = "application/json"
type choices struct {
	Choices []string
	Email 	string
}

func NewMongoContext(session *Session) *MongoContext {
	if session == nil {
		panic("nil mongo session!")

	return &MongoContext{session}
}

func (mctx *MongoContext) InfoHandler(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodPost: // grabs header
		header := r.Header.Get(ContentTypeHeader)
		if len(header) == 0 {
			http.Error(w, fmt.Sprintf("Header content-type header required for this resource path"), http.StatusBadRequest)
			return
		}
		// check to make sure contains json
		if !strings.HasPrefix(header, ContentTypeApplicationJSON) {
			http.Error(w, fmt.Sprintf("Could not read new User, mismatched type: %v,", http.StatusUnsupportedMediaType), 415)
			return
		}
		// create NewUser struck and pop with json
		choices := &choices{}
		if err := json.NewDecoder(r.Body).Decode(choices); err != nil {
			http.Error(w, fmt.Sprintf("Error decoding JSON: %v", err),
				http.StatusBadRequest)
			return
		}
		email := ""
		if len(choices.Email) != 0 {
			email = choices.Email
		}
		toDataBase := &MongoInfo{
			bson.NewObjectId(),
			choices.Choices,
			email, 
		}
		i := mctx
		info := mctx.DB("mydata").C("Info")
		if err := info.Insert(toDataBase); err != nil {
			fmt.Printf("error inserting document: %v\n", err)
		} else {
			fmt.Printf("inserted document with ID %s\n", c.ID.Hex())
		}
		resources := mctx.DB("mydata").C("Resources")
		apichaya := &MongoResources{
			bson.ObjectId(),
			"API Chaya",
			"Seattle",
			"Washington",
			18779224292,
			"www.apichaya.org"
			"https://pbs.twimg.com/profile_images/525729913760784384/2mdHXfh1_400x400.png",
		}
		marysplace := &MongoResources{
			bson.ObjectId(),
			"Mary's Place",
			"Seattle",
			"Washington",
			2062451026,
			"www.marysplaceseattle.org"
			"https://fremontmischief.com/wp-content/uploads/2017/01/Marys-Place-logo.png",
		}
		if err := resources.Insert(apichaya); err != nil {
			fmt.Printf("error inserting document: %v\n", err)
		} else {
			fmt.Printf("inserted document with ID %s\n", c.ID.Hex())
		}
		if err := resources.Insert(marysplace); err != nil {
			fmt.Printf("error inserting document: %v\n", err)
		} else {
			fmt.Printf("inserted document with ID %s\n", c.ID.Hex())
		}
		resources := [apichaya, marysplace]
		w.Header().Add("Content-Type", "application/json")
		w.WriteHeader(http.StatusCreated)
		if err := json.NewEncoder(w).Encode(resources); err != nil {
			http.Error(w, fmt.Sprintf("Error encoding JSON: %v", http.StatusInternalServerError), 500)
			return
		}
	default:
		// Handles any methods not allowed at this resource path
		http.Error(w, "Method not supported", http.StatusMethodNotAllowed)
		return
	}
}