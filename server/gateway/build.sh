#!/bin/bash
GOOS=linux go build
docker build -t maryhuibregtse/capstone-gateway .
go clean