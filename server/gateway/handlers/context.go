package handlers

import (
	"sharespace/server/gateway/models/users"
	"sharespace/server/gateway/sessions"
	// "gopkg.in/mgo.v2"
)
type HandlerContext struct {
	Key          string
	UserStore    users.Store
	SessionStore sessions.Store
	// MongoConn	 *mgo.Session
	
}