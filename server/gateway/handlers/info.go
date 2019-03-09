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
	"sort"
	"gopkg.in/mgo.v2"
)

const ContentTypeHeader = "Content-Type"
const ContentTypeApplicationJSON = "application/json"

func NewMongoContext(session *Session) *MongoContext {
	if session == nil {
		panic("nil mongo session!")

	return &MongoContext{session}
}
func (mctx *MongoContext) GetInfoHandler(w http.ResponseWriter, r *http.Request) {
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
			userinput := &Info{}
			if err := json.NewDecoder(r.Body).Decode(userinput); err != nil {
				http.Error(w, fmt.Sprintf("Error decoding JSON: %v", err),
					http.StatusBadRequest)
				return
			}
			info := mctx.DB("mydata").C("Info")
			userinput.ID = bson.NewObjectId()
			if err := info.Insert(c); err != nil {
				fmt.Printf("error inserting document: %v\n", err)
			} else {
				fmt.Printf("inserted document with ID %s\n", c.ID.Hex())
			}


}