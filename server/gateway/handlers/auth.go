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
	// "sort"
	"sharespace/server/gateway/models/users"
	"sharespace/server/gateway/sessions"

)

const AuthorizationHeader = "Authorization"
const ContentTypeHeader = "Content-Type"
const ContentTypeApplicationJSON = "application/json"

//TODO: define HTTP handler functions as described in the
//assignment description. Remember to use your handler context
//struct as the receiver on these functions so that you have
//access to things like the session store and user store.

//NewHandlerContext constructs a new HandlerContext,
//ensuring that the dependencies are valid values
func NewHandlerContext(Key string, UserStore users.Store, SessionStore sessions.Store) *HandlerContext {
	if UserStore == nil {
		panic("nil SQLDB session!")
	}
	if SessionStore == nil {
		panic("nil redisDB session!")
	}
	if len(Key) < 1 {
		panic("no key passed!")
	}
	return &HandlerContext{Key, UserStore, SessionStore}
}

// UsersHandler gets get user out of json
func (ctx *HandlerContext) UsersHandler(w http.ResponseWriter, r *http.Request) {
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
		newUser := &users.NewUser{}
		if err := json.NewDecoder(r.Body).Decode(newUser); err != nil {
			http.Error(w, fmt.Sprintf("Error decoding JSON: %v", err),
				http.StatusBadRequest)
			return
		}
		
		// validate user
		if err := newUser.Validate(); err != nil {
			http.Error(w, fmt.Sprintf("error validating new user: %v", err), 400)
			return
		}
		// convert to user
		valUser, err := newUser.ToUser()
		if err != nil {
			http.Error(w, fmt.Sprintf("error: could not convert to user, %v", err), 400)
			return
		}
		// add user to user.Store
		theUser, theErr := ctx.UserStore.Insert(valUser)
		if theErr != nil {
			http.Error(w, fmt.Sprintf("error: could not insert user in db, %v", theErr), 400)
			return
		}
		// chekc to see if you
		if theUser.ID < 1 {
			http.Error(w, fmt.Sprintf("error: user couldn no be inserted in db, %v", err), 500)
			return
		}
		sessionState := &SessionState{
            Time: time.Now(),
            User: theUser,
        }
		// create a new session
		_, err2 := sessions.BeginSession(ctx.Key, ctx.SessionStore, sessionState, w)
		if err2 != nil {
			http.Error(w, fmt.Sprintf("error: could not start session, %v", err), 500)
			return
		}
		// ss := &SessionsState{
		// 	theUser,
		// 	time,
		// }
		// returns the user information to the client
		w.Header().Add("Content-Type", "application/json")
		w.WriteHeader(http.StatusCreated)
		if err := json.NewEncoder(w).Encode(theUser); err != nil {
			http.Error(w, fmt.Sprintf("Error encoding JSON: %v", err),
				http.StatusInternalServerError)
			return
		}

	default:
		// Handles any methods not allowed at this resource path
		http.Error(w, fmt.Sprintf("Method not supported: %v", http.StatusMethodNotAllowed), 405)
		return
	}
}

// SpecificUsersHandler suports a signed is user and functions
func (ctx *HandlerContext) SpecificUsersHandler(w http.ResponseWriter, r *http.Request) {
	id := path.Base(r.URL.Path)
	// check := strings.Split(r.URL.Path, '/')
	// if len(check) > 4 {
	// 	http.Error(w, fmt.Sprintf("error: no user id found"),400)
	// 	return
	// }
	sesState := &SessionState{}
	_, err := sessions.GetState(r, ctx.Key, ctx.SessionStore, sesState)
	if err != nil {
		http.Error(w, fmt.Sprintf("Not a signed in user: %v", http.StatusUnauthorized), 401)
	}

	var userID int64
	if id == "me" {
		userID = sesState.User.ID
	} else {
		userID, err = strconv.ParseInt(id, 10, 64)
		if err != nil {
			http.Error(w, fmt.Sprintf("Error while getting userID: %v", err),
				http.StatusBadRequest)
			return
		}

	}
	user, err := ctx.UserStore.GetByID(userID)
	if err != nil {
		http.Error(w, fmt.Sprintf("error: don't recognize user: %v", http.StatusNotFound), 404)
		return 
	}

	switch r.Method {
	case http.MethodGet: // grabs header
		w.Header().Add(ContentTypeHeader, ContentTypeApplicationJSON)
		w.WriteHeader(http.StatusOK)
		if err := json.NewEncoder(w).Encode(user); err != nil {
			http.Error(w, fmt.Sprintf("Error encoding JSON: %v", err),
				http.StatusInternalServerError)
			return
		}

	case http.MethodPatch:
		if userID != sesState.User.ID {
			http.Error(w, "Forbidden Access",
				http.StatusForbidden)
			return
		}
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
		updates := &users.Updates{}
		if err := json.NewDecoder(r.Body).Decode(updates); err != nil {
			http.Error(w, fmt.Sprintf("Error decoding JSON: %v", err), http.StatusBadRequest)
			return
		}

		_, err := ctx.UserStore.Update(userID, updates)
		if err != nil {
			http.Error(w, fmt.Sprintf("Error occurred while updating user: %v", err),
			http.StatusBadRequest)
			return
		}
		w.Header().Add("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		if err := json.NewEncoder(w).Encode(user); err != nil {
			http.Error(w, fmt.Sprintf("Error encoding JSON: %v", err),
				http.StatusInternalServerError)
			return
		}

	default:
		// Handles any methods not allowed at this resource path
		http.Error(w, "Method not supported", http.StatusMethodNotAllowed)
		return
	}
}
// SessionsHandler manages starts and manages sessions for user, updates db on signins
func (ctx *HandlerContext) SessionsHandler(w http.ResponseWriter, r *http.Request) {

	switch r.Method {
	case http.MethodPost:
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
		creds := &users.Credentials{}
		if err := json.NewDecoder(r.Body).Decode(creds); err != nil {
			http.Error(w, fmt.Sprintf("Error decoding JSON: %v", err), http.StatusBadRequest)
			return
		}
		user, err := ctx.UserStore.GetByEmail(creds.Email)
		if err != nil {
			// do something that takes some time
			time.Sleep(time.Second + 3)
			http.Error(w, fmt.Sprintf("err: invalid user credentials"), http.StatusUnauthorized)
			return

		}
		if err := user.Authenticate(creds.Password); err != nil {
			http.Error(w, fmt.Sprintf("err: invalid user credentials"), http.StatusUnauthorized)
			return
		}

		xff := r.Header.Get("X-Forwarded-For")

		ip := ""
		if len(xff) == 0 {
			ip = r.RemoteAddr
		} else {
			ips := strings.Split(xff, ",")
			ip = ips[0]
		}
		track := &users.UserSignIn{}
		track.UserID = user.ID
		track.DateTime = time.Now()
		track.ClientIP = ip
		if err := ctx.UserStore.TrackUserSignIn(track); err != nil {
			http.Error(w, fmt.Sprintf("error: tracking user in db: "), 500)
			return
		}

		w.Header().Add("Content-Type", "application/json")
		w.WriteHeader(http.StatusCreated)
		if err := json.NewEncoder(w).Encode(user); err != nil {
			http.Error(w, fmt.Sprintf("Error encoding JSON: %v", http.StatusInternalServerError), 500)
			return
		}

	default:
		// Handles any methods not allowed at this resource path
		http.Error(w, "Method not supported", http.StatusMethodNotAllowed)
		return
	}
}
// SpecificSessionHandler manages authenticated users sessions, such as ending sessions
func (ctx *HandlerContext) SpecificSessionHandler(w http.ResponseWriter, r *http.Request) {

	switch r.Method {
	case http.MethodDelete:
		mine := path.Base(r.URL.Path)
		if mine != "mine" {
			http.Error(w, fmt.Sprintf("forbidden status"), http.StatusForbidden)
			return	
		}
		header := r.Header.Get(AuthorizationHeader)
		if len(header) == 0 {
			http.Error(w, fmt.Sprintf("Header content-type header required for this resource path"), http.StatusUnauthorized)
			return
		}
		_, err := sessions.EndSession(r, ctx.Key, ctx.SessionStore)
		if err != nil {
			http.Error(w, "Error closing session: %v", 500)
			return
		}
		w.Header().Add(ContentTypeHeader, "text/plain")
		io.WriteString(w,"signed out")
	default:
		// Handles any methods not allowed at this resource path
		http.Error(w, "Method not supported", http.StatusMethodNotAllowed)
		return
	}
}

	
