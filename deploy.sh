#!/bin/bash

# Create custom network
sudo docker network create appnetwork

# Build Docker image
sudo docker build -t expressdemo .

# Stop and remove existing expressapp container (if any)
sudo docker stop expressapp
sudo docker rm expressapp

# Stop and remove existing mongodb container (if any)
sudo docker stop mongodb
sudo docker rm mongodb

# Run a new mongodb container
sudo docker run -d --name mongodb --network appnetwork -v mongo-data:/data/db -p 27017:27017 mongo

# Run a new expressapp container and connect it to the MongoDB container
sudo docker run -d -p 4000:4000 --name expressapp --network appnetwork expressdemo

echo "Deployed!"
