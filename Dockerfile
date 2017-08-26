FROM node:8.4

RUN mkdir -p /app
WORKDIR /app

RUN npm config set spin=false
# RUN npm install bower -g -q --loglevel warn
RUN npm install ember-cli@^2.14.2 -g -q --loglevel warn
# RUN npm install yarn@latest -g -q --loglevel warn

# ADD bower.json ./
# RUN bower --allow-root install

ADD package.json ./
ADD package-lock.json ./
# ADD yarn.lock ./
RUN npm install
# RUN yarn install

# ADD testem.ci.js ./testem.js

RUN mkdir ./tmp
ADD .git ./.git
ADD . ./

RUN ember build -e production

CMD ["npm", "start"]
