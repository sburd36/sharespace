package handlers

import (
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

type MongoContext struct {
	MongoSession *mgo.Session
}

type MongoInfo struct {
	ID 			bson.ObjectId 	`bson:"_id"`
	Choices 	[]string	  	`json: "choices"`
	City 		string		  	`json: "city"`
	State 		string			`json: "state"`
	Email 		string		  	`json: "email"`
}

type MongoResources struct {
	ID	 		bson.ObjectId	`bson:"_id"`
	Name 		string 			`json: "name"`
	City 	    string 			`json: "city"`
	State 	    string 			`json: "state"`
	Phone		int64			`json: "phone"`
	Website     string			`json: "website"`
	ImagePath 	string 			`json: "imagePath"`
}