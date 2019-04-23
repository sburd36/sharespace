#!/bin/bash

update() {
        # set environment variables
    GATEWAYADDRESS=":4000" # change later
    MYSQL_ROOT_PASSWORD=$(openssl rand -base64 18)
    SQLADDR="userdb:3306"
    SQLNAME="userdb"
    GAETWAYNAME="capstoneGateway"
    DSN="root:$MYSQL_ROOT_PASSWORD@tcp($SQLADDR)/$SQLNAME"
    MONGOADDRESS=""
    REDISNAME="sessions"
    REDISADDRESS="sessions:6379"
    SIGNINGKEY=""
    TLSCERT=""
    TLSKEY=""
    NETWORK="capstoneNetwork"

    docker image prune -f
    docker volume prune -f
    docker container prune -f

    docker network rm $NETWORK

    docker rm $REDISNAME -f
    docker rm  $GAETWAYNAME -f
    docker rm $SQLNAME -f


    # pull most recent container images from Dockerhub
    docker pull maryhuibregtse/capstone-gateway
    docker pull maryhuibregtse/userdb

    docker network create $NETWORK



 
    echo "Running Redis container..."
    docker run -d --name sessions --network $NETWORK redis

    # building user db
    docker run -d \
    --name userdb \
    --network $NETWORK \
    -e MYSQL_ROOT_PASSWORD=$MYSQL_ROOT_PASSWORD \
    -e MYSQL_DATABASE=$SQLNAME \
    maryhuibregtse/$SQLNAME

    echo "Waiting for all dependencies to boot up..."
    sleep 5s

    #  -v /etc/letsencrypt:/etc/letsencrypt:ro \

    docker run -d --name capstoneGateway \
    -p 4000:4000 \
    -e TLSCERT=$TLSCERT \
    -e TLSKEY=$TLSKEY \
    -e SIGNINGKEY=$SIGNINGKEY \
    -e REDISADDRESS=$REDISADDRESS \
    -e GATEWAYADDRESS=$GATEWAYADDRESS \
    --network $NETWORK \
    maryhuibregtse/capstone-gateway

    echo "Done."
}

update