package sessions

import (
	"fmt"
	"errors"
	"log"
	"net/http"
	"strings"
)

const headerAuthorization = "Authorization"
const paramAuthorization = "auth"
const schemeBearer = "Bearer "

//ErrNoSessionID is used when no session ID was found in the Authorization header
var ErrNoSessionID = errors.New("no session ID found in " + headerAuthorization + " header")

//ErrInvalidScheme is used when the authorization scheme is not supported
var ErrInvalidScheme = errors.New("authorization scheme not supported")

//BeginSession creates a new SessionID, saves the `sessionState` to the store, adds an
//Authorization header to the response with the SessionID, and returns the new SessionID
func BeginSession(signingKey string, store Store, sessionState interface{}, w http.ResponseWriter) (SessionID, error) {
	//TODO:
	//- create a new SessionID
	sessionID, err := NewSessionID(signingKey)
	if err != nil {
		return InvalidSessionID, err
	}

	//- save the sessionState to the store
	if err := store.Save(sessionID, sessionState); err != nil {
		return InvalidSessionID, fmt.Errorf("error: invalid session %v", err)
	}

	//- add a header to the ResponseWriter that looks like this:
	//    "Authorization: Bearer <sessionID>"
	w.Header().Add(headerAuthorization, schemeBearer+sessionID.String())
	log.Print("auth key in auth.go: ", w.Header().Get(headerAuthorization))
	//  where "<sessionID>" is replaced with the newly-created SessionID
	//  (note the constants declared for you above, which will help you avoid typos)

	return sessionID, nil
}

//GetSessionID extracts and validates the SessionID from the request headers
func GetSessionID(r *http.Request, signingKey string) (SessionID, error) {
	// getting auth key from header
	value := r.Header.Get(headerAuthorization)

	// else getting auth key from query string param
	if len(value) == 0 {
		value = r.FormValue(paramAuthorization)
		// r.query.Get
	}
	// of there are no values through error
	if len(value) == 0 {
		return InvalidSessionID, ErrNoSessionID
	}

	valueString := strings.Replace(value, schemeBearer, "", 1)

	// log.Println(values)
	// getting sessionID
	ID, err := ValidateID(valueString, signingKey)
	log.Println(err)
	if err != nil {
		return InvalidSessionID, err
	}

	//TODO: get the value of the Authorization header,
	//or the "auth" query string parameter if no Authorization header is present,
	//and validate it. If it's valid, return the SessionID. If not
	//return the validation error.
	return ID, nil
}

//GetState extracts the SessionID from the request,
//gets the associated state from the provided store into
//the `sessionState` parameter, and returns the SessionID
func GetState(r *http.Request, signingKey string, store Store, sessionState interface{}) (SessionID, error) {
	//TODO: get the SessionID from the request, and get the data
	//associated with that SessionID from the store.

	// getting sessionID
	log.Println("hellooo")
	sessID, err := GetSessionID(r, signingKey)
	if err != nil {
		return InvalidSessionID, err
	}
	log.Println(sessID)
	// getting data form store
	work := store.Get(sessID, sessionState)
	if work != nil {
		return sessID, work
	}
	return sessID, nil
}

//EndSession extracts the SessionID from the request,
//and deletes the associated data in the provided store, returning
//the extracted SessionID.
func EndSession(r *http.Request, signingKey string, store Store) (SessionID, error) {
	sessID, err := GetSessionID(r, signingKey)
	if err != nil {
		return InvalidSessionID, err
	}
	work := store.Delete(sessID)
	if work != nil {
		return sessID, work
	}
	//TODO: get the SessionID from the request, and delete the
	//data associated with it in the store.
	return sessID, nil
}
