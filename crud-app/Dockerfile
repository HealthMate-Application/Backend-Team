# Base Image 
FROM node:20

# Set Working directory 
WORKDIR /app 

# Copy package.json 
COPY package*.json ./

# Install dependencies 
RUN npm install 


# Copy the app files 
COPY . .

# Expose the port 
EXPOSE 3002

# Command to run the application 
CMD ["node", "index.js"]
