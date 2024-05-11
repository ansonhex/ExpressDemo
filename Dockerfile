# Use the official Node.js image as a base image
FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy all files from the current directory to the working directory in the container
COPY . .

# Specify the port the container will listen on
EXPOSE 4000

# Define the command to run the app when the container starts
CMD ["node", "app.js"]

