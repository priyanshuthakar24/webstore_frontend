# todo: complet this today projet 
# Step 1: Build the React app
FROM node:18-alpine AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# !Copy the environment variables from .env to the container
# This will be used by React during the build process
ARG REACT_APP_API_URL
ARG REACT_APP_SYNC_LINCE
ENV REACT_APP_API_URL=http://13.233.116.120:5000
ENV REACT_APP_SYNC_LINCE=Ngo9BigBOggjHTQxAR8/V1NDaF5cWWtCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdnWH9ccHRQQmFfU0V/XkM=
ENV REACT_APP_RAZORPAY_ID=rzp_test_M6smEH1aZQNcMi

# Disable source maps to optimize memory usage
ENV GENERATE_SOURCEMAP=false

# Increase Node.js memory limit and build the React app
RUN export NODE_OPTIONS="--max-old-space-size=4096" && npm run build

# Step 2: Serve the React app using a lightweight web server
FROM nginx:alpine

# Copy the build output to the nginx html directory
COPY --from=build /app/build /usr/share/nginx/html

# Copy custom nginx configuration if you have one (optional)
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 3000 to be able to access the app
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]