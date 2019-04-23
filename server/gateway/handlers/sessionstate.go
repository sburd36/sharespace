package handlers
import (
	"time"
	"sharespace/server/gateway/models/users"
)

//TODO: define a session state struct for this web server
//see the assignment description for the fields you should include
//remember that other packages can only see exported fields!
type SessionState struct {
	User 	*users.User
	Time 	 time.Time 
}