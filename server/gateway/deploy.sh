#!/bin/bash
sh build.sh
docker push maryhuibregtse/capstone-gateway
# docker push maryhuibregtse/userdb
ssh -oStrictHostKeyChecking=no ec2-user@18.219.53.197 'bash -s' < upgrade-server.sh for ec2