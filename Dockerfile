# Use the official Python image
FROM node:22

# Set the working directory inside the container
WORKDIR /app
 
# Copy package.json and package-lock.json
COPY package*.json ./
 
# Install dependencies
RUN npm install
 
# Copy the rest of your application files
COPY . .
 
# Expose the port 
EXPOSE 3000
 
# Define the command to run your app
CMD ["npm", "start"]
