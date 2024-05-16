#!/bin/bash

sudo docker build -t expressdemo .
sudo docker stop expressapp
sudo docker rm expressapp
sudo docker run -d -p 4000:4000 --name expressapp --link mongodb:mongodb expressdemo

echo "Deployed!"
