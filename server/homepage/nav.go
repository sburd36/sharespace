package main
import (
	"gopkg.in/mgo.v2"
	"fmt"
)
type MongoContext struct {
    mongosess *mgo.Session
}

type Pages struct {
	ID        bson.ObjectId `bson:"_id"` //saved to mongo as `_id`
	Name 	  string
    Content	  string
    images	  []image.Image
}

//NewHandlerContext constructs a new HandlerContext,
//ensuring that the dependencies are valid values
func NewHandlerContext(mongosess *mgoSession) *MongoContext {
    if mongosess == nil {
        panic("nil MongoDB session!")
    }
    return &MongoContext{mongosess}
}