FROM node:8
# Create app directory
RUN mkdir -p /usr/src/app/src
WORKDIR /usr/src/app
# Install app dependencies
COPY package*.json ./

RUN npm install
# Copy app source code

COPY src src
COPY server.js ./

#Expose port and start application
EXPOSE 5000
CMD [ "npm", "start" ]