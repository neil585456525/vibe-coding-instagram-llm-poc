# Use the official Node.js 18 image with Python support
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json yarn.lock ./

# Install all dependencies (including dev dependencies for build)
RUN yarn install --frozen-lockfile

# Copy source code
COPY . .

# Build TypeScript
RUN yarn build

# Remove dev dependencies and reinstall only production dependencies
RUN yarn install --frozen-lockfile --production && yarn cache clean

# Expose port
EXPOSE 4000

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

# Change ownership of the app directory
RUN chown -R nodejs:nodejs /app
USER nodejs

# Start the application
CMD ["yarn", "start"]
