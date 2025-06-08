# Stage 1: Build the NestJS application
# Use Node.js 22 to match the development environment
FROM node:22-alpine AS build
WORKDIR /app

# Install OpenSSL, a required dependency for Prisma on Alpine
RUN apk add --no-cache openssl

# Copy package files and install dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# Copy the rest of the application source code
COPY . .

# ---- FIX: Generate the Prisma Client ----
    # This command reads your schema.prisma and generates the client code
    # inside node_modules/@prisma/client. It's needed before the build.
    RUN npx prisma generate
    
    # Build the application
    RUN npm run build
    
    # Stage 2: Create the production image
    # Use the same Node.js version for the final image
    FROM node:22-alpine
    WORKDIR /app
    
    # Install OpenSSL again in the final stage
    RUN apk add --no-cache openssl
    
    # Copy package files and prisma schema
    COPY package.json ./
    COPY package-lock.json ./
    # ---- FIX: Copy the prisma schema ----
        # The schema is needed in the final image so the postinstall script
        # for Prisma can generate the client again.
        COPY prisma ./prisma/
        
        # Install only production dependencies. The postinstall hook for @prisma/client
        # will automatically run 'prisma generate' using the schema we just copied.
        RUN npm install --omit=dev
        
        # Copy the built application from the 'build' stage
        COPY --from=build /app/dist ./dist
        
        # Expose the port the app runs on (default is 3000 for NestJS)
        EXPOSE 3000
        
        # Command to run the application
        CMD ["node", "dist/src/main"]