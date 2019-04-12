package handlers

import (
	"gopkg.in/mgo.v2"
)

type MongoContext struct {
	MongoSession *mgo.Session
}

type MongoInfo struct {
	ID 			bson.ObjectId `json: "id"`
	Location 	string		  `json: "location"`
	Choices 	[]string	  `json: "choices"`
	Email 		string		  `json: "email"`
}

type MongoResources struct {
	ID	 		bson.ObjectId	`json: "id"`
	Name 		string 			`json: "name"`
	City 	    string 			`json: "city"`
	State 	    string 			`json: "state"`
	Phone		int64			`json: "phone"`
	Website     string			`json: "website"`
	ImagePath 	string 			`json: "imagePath"`
}