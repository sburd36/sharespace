package handlers

import (
	"gopkg.in/mgo.v2"
)

type MongoContext struct {
	MongoSession *Session
}

type Info struct {
	ID 		bson.ObjectId
	Choices []string
	Email 	string
}