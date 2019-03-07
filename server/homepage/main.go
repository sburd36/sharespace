package main

import (
	"log"
    "fmt"

    "gopkg.in/mgo.v2"
)

func main() {
	sess, err := mgo.Dial("127.0.0.1")
    if err != nil {
        log.Fatalf("error dialing mongo: %v\n", err)
	}
	ctx := &MongoContext{
		sess,
	}
	addr := os.Getenv("ADDR")
	if len(addr) == 0 {
		addr = ":80"
	}

	mux := http.NewServeMux()
	mux.HandleFunc("/v1/home", ctx)

	log.Printf("server is listening at http://%s", addr)
	log.Fatal(http.ListenAndServe(addr, mux))

}