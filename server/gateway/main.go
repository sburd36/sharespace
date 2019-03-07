package main

import (
	"log"
	"net/http"
	"os"
	"github.com/huibrm/assignments-huibrm/servers/gateway/handlers"
)


//main is the main entry point for the server
func main() {
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
	mux.HandleFunc("/v1/summary", handlers.SummaryHandler)
	
	log.Printf("Server is listening at http://%s:", ADDR)
	log.Fatal(http.ListenAndServeTLS(ADDR, TLSCERT, TLSKEY, mux))
}