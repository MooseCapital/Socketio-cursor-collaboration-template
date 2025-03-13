
# Use the official Node.js image as the base image
FROM node:22.14-slim

ENV NODE_ENV=production

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