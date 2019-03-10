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
	"gopkg.in/mgo.v2"
)

const ContentTypeHeader = "Content-Type"
const ContentTypeApplicationJSON = "application/json"
type choices struct {
	Choices []string
	Email 	string
}
// const gopher = `iVBORw0KGgoAAAANSUhEUgAAAEsAAAA8CAAAAAALAhhPAAAFfUlEQVRYw62XeWwUVRzHf2+OPbo9d7tsWyiyaZti6eWGAhISoIGKECEKCAiJJkYTiUgTMYSIosYYBBIUIxoSPIINEBDi2VhwkQrVsj1ESgu9doHWdrul7ba73WNm3vOPtsseM9MdwvvrzTs+8/t95ze/33sI5BqiabU6m9En8oNjduLnAEDLUsQXFF8tQ5oxK3vmnNmDSMtrncks9Hhtt/qeWZapHb1ha3UqYSWVl2ZmpWgaXMXGohQAvmeop3bjTRtv6SgaK/Pb9/bFzUrYslbFAmHPp+3WhAYdr+7GN/YnpN46Opv55VDsJkoEpMrY/vO2BIYQ6LLvm0ThY3MzDzzeSJeeWNyTkgnIE5ePKsvKlcg/0T9QMzXalwXMlj54z4c0rh/mzEfr+FgWEz2w6uk8dkzFAgcARAgNp1ZYef8bH2AgvuStbc2/i6CiWGj98y2tw2l4FAXKkQBIf+exyRnteY83LfEwDQAYCoK+P6bxkZm/0966LxcAAILHB56kgD95PPxltuYcMtFTWw/FKkY/6Opf3GGd9ZF+Qp6mzJxzuRSractOmJrH1u8XTvWFHINNkLQLMR+XHXvfPPHw967raE1xxwtA36IMRfkAAG29/7mLuQcb2WOnsJReZGfpiHsSBX81cvMKywYZHhX5hFPtOqPGWZCXnhWGAu6lX91ElKXSalcLXu3UaOXVay57ZSe5f6Gpx7J2MXAsi7EqSp09b/MirKSyJfnfEEgeDjl8FgDAfvewP03zZ+AJ0m9aFRM8eEHBDRKjfcreDXnZdQuAxXpT2NRJ7xl3UkLBhuVGU16gZiGOgZmrSbRdqkILuL/yYoSXHHkl9KXgqNu3PB8oRg0geC5vFmLjad6mUyTKLmF3OtraWDIfACyXqmephaDABawfpi6tqqBZytfQMqOz6S09iWXhktrRaB8Xz4Yi/8gyABDm5NVe6qq/3VzPrcjELWrebVuyY2T7ar4zQyybUCtsQ5Es1FGaZVrRVQwAgHGW2ZCRZshI5bGQi7HesyE972pOSeMM0dSktlzxRdrlqb3Osa6CCS8IJoQQQgBAbTAa5l5epO34rJszibJI8rxLfGzcp1dRosutGeb2VDNgqYrwTiPNsLxXiPi3dz7LiS1WBRBDBOnqEjyy3aQb+/bLiJzz9dIkscVBBLxMfSEac7kO4Fpkngi0ruNBeSOal+u8jgOuqPz12nryMLCniEjtOOOmpt+KEIqsEdocJjYXwrh9OZqWJQyPCTo67LNS/TdxLAv6R5ZNK9npEjbYdT33gRo4o5oTqR34R+OmaSzDBWsAIPhuRcgyoteNi9gF0KzNYWVItPf2TLoXEg+7isNC7uJkgo1iQWOfRSP9NR11RtbZZ3OMG/VhL6jvx+J1m87+RCfJChAtEBQkSBX2PnSiihc/Twh3j0h7qdYQAoRVsRGmq7HU2QRbaxVGa1D6nIOqaIWRjyRZpHMQKWKpZM5feA+lzC4ZFultV8S6T0mzQGhQohi5I8iw+CsqBSxhFMuwyLgSwbghGb0AiIKkSDmGZVmJSiKihsiyOAUs70UkywooYP0bii9GdH4sfr1UNysd3fUyLLMQN+rsmo3grHl9VNJHbbwxoa47Vw5gupIqrZcjPh9R4Nye3nRDk199V+aetmvVtDRE8/+cbgAAgMIWGb3UA0MGLE9SCbWX670TDy1y98c3D27eppUjsZ6fql3jcd5rUe7+ZIlLNQny3Rd+E5Tct3WVhTM5RBCEdiEK0b6B+/ca2gYU393nFj/n1AygRQxPIUA043M42u85+z2SnssKrPl8Mx76NL3E6eXc3be7OD+H4WHbJkKI8AU8irbITQjZ+0hQcPEgId/Fn/pl9crKH02+5o2b9T/eMx7pKoskYgAAAABJRU5ErkJggg==`

// func gopherPNG() io.Reader { return base64.NewDecoder(base64.StdEncoding, strings.NewReader(gopher)) }

func NewMongoContext(session *Session) *MongoContext {
	if session == nil {
		panic("nil mongo session!")

	return &MongoContext{session}
}

func (mctx *MongoContext) InfoHandler(w http.ResponseWriter, r *http.Request) {
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
		choices := &choices{}
		if err := json.NewDecoder(r.Body).Decode(choices); err != nil {
			http.Error(w, fmt.Sprintf("Error decoding JSON: %v", err),
				http.StatusBadRequest)
			return
		}
		email := ""
		if len(choices.Email) != 0 {
			email = choices.Email
		}
		toDataBase := &MongoInfo{
			bson.NewObjectId(),
			choices.Choices,
			email, 
		}
		info := mctx.DB("mydata").C("Info")
		if err := info.Insert(toDataBase); err != nil {
			fmt.Printf("error inserting document: %v\n", err)
		} else {
			fmt.Printf("inserted document with ID %s\n", c.ID.Hex())
		}
		resources := mctx.DB("mydata").C("Resources")
		apichaya := &MongoResources{
			bson.ObjectId(),
			"API Chaya",
			"Seattle",
			"Washington",
			18779224292,
			"www.apichaya.org"
			"https://pbs.twimg.com/profile_images/525729913760784384/2mdHXfh1_400x400.png",
		}
		marysplace := &MongoResources{
			bson.ObjectId(),
			"Mary's Place",
			"Seattle",
			"Washington",
			2062451026,
			"www.marysplaceseattle.org"
			"https://fremontmischief.com/wp-content/uploads/2017/01/Marys-Place-logo.png",
		}
		if err := resources.Insert(apichaya); err != nil {
			fmt.Printf("error inserting document: %v\n", err)
		} else {
			fmt.Printf("inserted document with ID %s\n", c.ID.Hex())
		}
		if err := resources.Insert(marysplace); err != nil {
			fmt.Printf("error inserting document: %v\n", err)
		} else {
			fmt.Printf("inserted document with ID %s\n", c.ID.Hex())
		}
		resources := [apichaya, marysplace]
		w.Header().Add("Content-Type", "application/json")
		w.WriteHeader(http.StatusCreated)
		if err := json.NewEncoder(w).Encode(resources); err != nil {
			http.Error(w, fmt.Sprintf("Error encoding JSON: %v", http.StatusInternalServerError), 500)
			return
		}
	default:
		// Handles any methods not allowed at this resource path
		http.Error(w, "Method not supported", http.StatusMethodNotAllowed)
		return
	}
}