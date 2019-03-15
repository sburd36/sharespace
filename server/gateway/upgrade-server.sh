export TLSCERT=/etc/letsencrypt/live/api.catsfordays.me/fullchain.pem
export TLSKEY=/etc/letsencrypt/live/api.catsfordays.me/privkey.pem
export MONGOADDR='resourcedb:27017'
export MONGONAME='resourcedb'
export NETWORK="capstone"
export GATEWAYNAME="gate"
export GATEWAYADDR=':444'

# removeing existing dockers

docker rm -f $GATEWAYNAME
docker rm -f $MONGONAME

# creating network

docker network rm $NETWORK

# removeing img making room for everything
docker image prune -f
docker container prune -f
docker volume prune -f

docker pull maryhuibregtse/capstone-gateway

docker network create $NETWORK

docker run -d \
--name $MONGONAME \
-e ADDR=$MONGOADDR \
--network $NETWORK mongo

sleep 10s

docker run -d \
--name $GATEWAYNAME \
--network $NETWORK \
-p 444:444 \
-e TLSCERT=$TLSCERT \
-e TLSKEY=$TLSKEY \
-e GATEWAYADDRESS=$GATEWAYADDR \
-e MONGOADDR=$MONGOADDR \
-v /etc/letsencrypt:/etc/letsencrypt:ro \
maryhuibregtse/capstone-gateway