#!/bin/bash
GOOS=linux go build
docker build -t maryhuibregtse/capstone .
go clean