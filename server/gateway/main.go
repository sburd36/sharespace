package main

import (
	"log"
	"net/http"
	"os"
	"github.com/huibrm/capstone2019/server/gateway/handlers"
	"gopkg.in/mgo.v2"
)


//main is the main entry point for the server
func main() {

	sess, err := mgo.Dial("127.0.0.1")
	if err != nil {
		fmt.Printf("error dialing mongo: %v\n", err)
	} else {
		fmt.Printf("connected successfully!")
	}
	mongoSess := &handlers.MongoContext{sess}

	ADDR := os.Getenv("ADDR")
	if len(ADDR) == 0 {
		ADDR = ":443"
	}
	
	TLSCERT := os.Getenv("TLSCERT")
	if len(TLSCERT) == 0 {
		log.Fatal("No TLSCERT environment variable found")
	}
	
	TLSKEY := os.Getenv("TLSKEY")
	if len(TLSKEY) == 0 {
		log.Fatal("No TLSKEY environment variable found")
	}
	
	mux := http.NewServeMux()
	mux.HandleFunc("/v1/info", handlers.mongoSess.InfoHandler)
	wrappedMux := handlers.NewCorsMW(mux)
	
	log.Printf("Server is listening at http://%s:", ADDR)
	log.Fatal(http.ListenAndServeTLS(addr, TLSCERT, TLSKEY, wrappedMux))
}