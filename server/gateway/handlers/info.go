package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)
const ImagePath = "./img/resources/"
const ContentTypeHeader = "Content-Type"
const ContentTypeApplicationJSON = "application/json"

type Choice struct {
	Choices []string  	`json: "choices"`
	City 	string		`json: "city"`
	State	string		`json: "state"`
	Email 	string    	`json: "email"`
}

type ReturnResources struct {
	ResourceList []*MongoResources `json:"resourceList"`
	
}



func NewMongoContext(session *mgo.Session) *MongoContext {
	if session == nil {
		panic("nil mongo session!")
	}
	return &MongoContext{session}
}

 

func (mctx *MongoContext) InfoHandler(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodPost: 
		// header := r.Header.Get(ContentTypeHeader)
		// if len(header) == 0 {
		// 	http.Error(w, fmt.Sprintf("Header content-type header required for this resource path"), http.StatusBadRequest)
		// 	return
		// }
		// // check to make sure contains json
		// if !strings.HasPrefix(header, ContentTypeApplicationJSON) {
		// 	http.Error(w, fmt.Sprintf("Could not read choices, mismatched type: %v,", http.StatusUnsupportedMediaType), 415)
		// 	return
		// }
		// create NewUser struck and pop with json
		choices := &Choice{}
		if err := json.NewDecoder(r.Body).Decode(choices); err != nil {
			http.Error(w, fmt.Sprintf("Error decoding JSON: %v", err),
				http.StatusBadRequest)
			return
		}
		email := ""
		if len(choices.Email) != 0 {
			email = choices.Email
		}
		mongoInfo := &MongoInfo{
			bson.NewObjectId(),
			choices.Choices,
			choices.City,
			choices.State,
			email, 
		}
		// put choices in Mongodb
		info := mctx.MongoSession.DB("mydata").C("Info")
		if err := info.Insert(mongoInfo); err != nil {
			fmt.Printf("error inserting document: %v\n", err)
			return
		} else {
			fmt.Printf("inserted document with ID %s\n", mongoInfo.ID.Hex())
		}
		// get resources from db
		resources := mctx.MongoSession.DB("mydata").C("Resources")
		mctx.CheckResources(resources)
		r := []*MongoResources{}
		err := resources.Find(nil).All(r); if err!= nil {
			fmt.Printf("error gathering resources")
			return
		}
		send := &ReturnResources {
			r,
		}
		w.Header().Add("Content-Type", "application/json")
		w.WriteHeader(http.StatusCreated)
		if err := json.NewEncoder(w).Encode(send); err != nil {
			http.Error(w, fmt.Sprintf("Error encoding JSON: %v", http.StatusInternalServerError), 500)
			return
		}
	default:
		// Handles any methods not allowed at this resource path
		http.Error(w, "Method not supported", http.StatusMethodNotAllowed)
		return
	}
}

// CheckResources checks mongodb to see if resources is populated, if not it populates
func (mctx *MongoContext) CheckResources(resources *mgo.Collection) {
	r := []*MongoResources{}
	resources.Find(nil).All(r)
	if len(r) == 0 {
		apichaya := &MongoResources{
			bson.NewObjectId(),
			"API Chaya",
			"Seattle",
			"Washington",
			18779224292,
			"www.apichaya.org",
			ImagePath+"apichaya.png",
		}
		marysplace := &MongoResources{
			bson.NewObjectId(),
			"Mary's Place",
			"Seattle",
			"Washington",
			2062451026,
			"www.marysplaceseattle.org",
			ImagePath+"marysplace.png",
		}
		if err := resources.Insert(apichaya); err != nil {
			fmt.Printf("error inserting document: %v\n", err)
			return
		} else {
			fmt.Printf("inserted document with ID %s\n", apichaya.ID.Hex())
		}
		if err := resources.Insert(marysplace); err != nil {
			fmt.Printf("error inserting document: %v\n", err)
			return

		}
		fmt.Printf("inserted document with ID %s\n", marysplace.ID.Hex())
	}
}