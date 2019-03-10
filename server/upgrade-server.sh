export TLSCERT=/etc/letsencrypt/live/api.catsfordays.me/fullchain.pem
export TLSKEY=/etc/letsencrypt/live/api.catsfordays.me/privkey.pem
export MONGOADDR='mongodb:27017'
export NETWORK="sharespace"
export GATEWAYNAME="gateway"

# removeing existing dockers

docker rm -f gateway
docker rm -f mongodb

# creating network

docker network rm $NETWORK

# removeing img making room for everything
docker image prune -f
docker container prune -f
docker volume prune -f

docker pull maryhuibregtse/capstone

docker network create $NETWORK

docker run -d \
--name mongodb \
-e ADDR='mongodb:27017' \
--network $NETWORK mongo

docker run -d \
--name $GATEWAYNAME \
--network $NETWORK \
-p 443:443 \
-e TLSCERT=$TLSCERT \
-e TLSKEY=$TLSKEY \
-e MONGOADDR=$MONGOADDR \
-v /etc/letsencrypt:/etc/letsencrypt:ro \
maryhuibregtse/capstone