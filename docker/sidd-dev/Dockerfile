FROM dictybase/frontend-builder:devsidd
LABEL maintainer "Siddhartha Basu <siddhartha-basu@northwestern.edu>"

# base path for React Router
ARG basename
ENV REACT_APP_BASENAME ${basename:-/stockcenter}

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# copy only necessary files
COPY package.json ./
COPY tsconfig.json ./
COPY yarn.lock ./

RUN yarn install

# add necessary folders
COPY src src
COPY public public

# overwrite the client key file
ADD $CLIENT_KEYS /usr/src/app/src/common/utils/clientConfig.ts

RUN yarn build

FROM dictybase/static-server:1.0.0
RUN mkdir /www
WORKDIR /www
COPY --from=0 /usr/src/app/build ./
ENTRYPOINT ["/usr/local/bin/app", "run", "-f", "/www", "--vf", "/static", "--sub-url", "/stockcenter"]
