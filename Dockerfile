FROM node:argon
MAINTAINER Siddhartha Basu<siddhartha-basu@northwestern.edu>

# URL for api server
ARG api_server
ENV API_SERVER $api_server

# URL for auth server
ARG auth_server
ENV AUTH_SERVER $auth_server

# base path for react router
ARG basename
ENV BASENAME $basename

# Setup client keys for third party auth
ARG client_keys
ENV CLIENT_KEYS ${client_keys:-src/utils/clientConfig.sample.js}

# Create app directory
RUN mkdir -p /usr/src/app 

# copy package.json for dependency install
# also to separate caching of dependencies from source code
COPY package.json /usr/src/app

# install express and logger globally
RUN npm install -g express morgan \
    && cd /usr/src/app \
# Install app dependencies \
    && npm install 


# Bundle app source
COPY . /usr/src/app
# overwrite the client key file 
COPY $CLIENT_KEYS /usr/src/app/src/utils/clientConfig.js

# Create client config file
RUN cd /usr/src/app \
    && npm run deploy \
    && mv dist /www \
# Add our user and group first to make sure their IDs get assigned consistently
    && groupadd -r app && useradd -r -g app app \
# install push server
    && cp server/push-server.js /usr/local/bin/ \
# cleanup
    && cd .. \
    && rm -rf app


# Set as default user 
USER app
ENV NODE_PATH /usr/local/lib/node_modules

EXPOSE 9596
CMD ["node", "/usr/local/bin/push-server.js"]


