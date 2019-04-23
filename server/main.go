package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"time"
	"database/sql"
	"capstone2019/server/gateway/handlers"
	"capstone2019/server/gateway/sessions"
	"gopkg.in/mgo.v2"
	"github.com/go-redis/redis"
	_ "github.com/go-sql-driver/mysql"
	"capstone2019/server/gateway/models/users"
)


//main is the main entry point for the server
func main() {
	sesKey := os.Getenv("SESSIONKEY")
	redisAddr := os.Getenv("REDISADDR")
	dsn := os.Getenv("DSN")
	redisdb := redis.NewClient(&redis.Options{
		Addr: redisAddr, // use default Address
	})
	pong, err := redisdb.Ping().Result()
	fmt.Println(pong, err)

	sesStore := sessions.NewRedisStore(redisdb, time.Hour)
	if sesStore == nil {
		log.Fatal("Session Store could not initiate")
	}

	userdb, err := sql.Open("mysql", dsn)
	if err != nil {
		fmt.Printf("error opening database: %v\n", err)
		os.Exit(1)
	}
	if err := userdb.Ping(); err != nil {
		fmt.Printf("error opening database %v", err)
	} else {
		fmt.Printf("Connectd Sucessfully!")
	}

	userStore := users.NewMySQLStore(userdb)
	if userStore == nil {
		log.Fatal("UserStore could not initiate")
	}
	defer userdb.Close()
	mongoConn, err := mgo.Dial("127.0.0.1")
	if err != nil {
		fmt.Printf("error dialing mongo: %v\n", err)
	} else {
		fmt.Printf("connected successfully!")
	}
	TLSCERT := os.Getenv("TLSCERT")
	if len(TLSCERT) == 0 {
		log.Fatal("No TLSCERT environment variable found")
	}

	TLSKEY := os.Getenv("TLSKEY")
	if len(TLSKEY) == 0 {
		log.Fatal("No TLSKEY environment variable found")
	}

	ADDR := os.Getenv("ADDR")
	if len(ADDR) == 0 {
		ADDR = ":443"
	}
	
	ctx := &handlers.HandlerContext{
		sesKey,
		userStore,
		sesStore,
		mongoConn,
	}
	mux := http.NewServeMux()
	// mux.HandleFunc("/v1/info", handlers.mongoSess.InfoHandler)
	mux.HandleFunc("/v1/users", ctx.UsersHandler)
	mux.HandleFunc("/v1/users/", ctx.SpecificUsersHandler)
	mux.HandleFunc("/v1/sessions", ctx.SessionsHandler)
	mux.HandleFunc("/v1/sessions/", ctx.SpecificSessionHandler)
	wrappedMux := handlers.NewCorsMW(mux)
	
	log.Printf("Server is listening at http://%s:", ADDR)
	log.Fatal(http.ListenAndServeTLS(ADDR, TLSCERT, TLSKEY, wrappedMux))
}