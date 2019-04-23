#!/bin/bash

build () {
    
    echo "Building Go executable for Linux..."
    GOOS=linux go build

    echo "Building Docker conatiner for user..."
    docker build -t maryhuibregtse/userdb ../db

    echo "Building Docker container for gateway..."
    docker build -t maryhuibregtse/capstone-gateway .
    
    echo "Cleaning Go executable for Linux"
    go clean
}

build