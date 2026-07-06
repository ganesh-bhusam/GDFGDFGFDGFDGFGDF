# Use a lightweight Node.js Alpine image
FROM node:20-alpine

# Install build tools for native dependencies (like sqlite3)
RUN apk add --no-cache python3 make g++ sqlite

# Set the working directory
WORKDIR /app

# Copy package files for the backend
COPY backend/package*.json ./backend/

# Install backend dependencies
WORKDIR /app/backend
RUN npm install

# Copy the rest of the application
WORKDIR /app
COPY backend ./backend
COPY frontend ./frontend

# Create the data directory for the SQLite volume and set permissions
RUN mkdir -p /app/backend/data && chown -R node:node /app/backend/data

# Use the non-root node user for better security
USER node

# Expose the application port
EXPOSE 8001

# Start the application
WORKDIR /app/backend
CMD ["npm", "start"]
