package main

import (
	"log"
	"net/http"
	"os"
	"capstone2019/server/gateway/handlers"
	"gopkg.in/mgo.v2"
	"fmt"
)
// HelloHandler is a handler to check if the dcode server is alive
func HelloHandler(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Welcome to Sharespace Server! :) "))
}

//main is the main entry point for the server
func main() {
	mongoAddr := os.Getenv("MONGOADDR")
	gatewayAddr := os.Getenv("GATEWAYADDR")
	if len(gatewayAddr) == 0 {
		gatewayAddr = ":444"
	}
	
	// connecting to resources
	sess, err := mgo.Dial("mongodb://"+mongoAddr)
	if err != nil {
		fmt.Printf("error dialing mongo: %v\n", err)
	} else {
		fmt.Printf("connected successfully!")
	}
	mongoSess := &handlers.MongoContext{sess}


	
	TLSCERT := os.Getenv("TLSCERT")
	if len(TLSCERT) == 0 {
		log.Fatal("No TLSCERT environment variable found")
	}
	
	TLSKEY := os.Getenv("TLSKEY")
	if len(TLSKEY) == 0 {
		log.Fatal("No TLSKEY environment variable found")
	}

	mux := http.NewServeMux()
	mux.HandleFunc("/sharespace", HelloHandler)
	mux.HandleFunc("/sharespace/info", mongoSess.InfoHandler)
	wrappedMux := handlers.NewCorsMW(mux)
	
	log.Printf("Server is listening at http://%s:", gatewayAddr)
	log.Fatal(http.ListenAndServeTLS(gatewayAddr, TLSCERT, TLSKEY, wrappedMux))
}