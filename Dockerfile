ARG NODE_ENV=production

# Use the official Node.js image as the base image
FROM node:18-alpine

ENV NODE_ENV ${NODE_ENV}

# create and Set the working directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the application files
COPY . .

# Start the application
CMD [ "npm", "run", "start" ]