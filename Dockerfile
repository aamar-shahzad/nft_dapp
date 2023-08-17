# Use an official Node.js runtime as the base image
FROM node:14-alpine

# Set the working directory for the application
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the React app
RUN npm run build

# Expose port 80 to the outside world
EXPOSE 4000

# Define the command to run your app
CMD ["npm", "start"]
