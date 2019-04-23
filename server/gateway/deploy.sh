#!/bin/bash

deploy() {
    bash ./build.sh

    echo "Updating dcode-gateway image on DockerHub..."
    docker push maryhuibregtse/capstone-gateway
    docker push maryhuibregtse/userdb

    # TODO -- ssh into ec2 instance
    bash ./upgrade-server.sh
}

deploy