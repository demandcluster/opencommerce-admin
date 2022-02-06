FROM node:14.18.3-alpine

WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY yarn.lock ./
RUN yarn --silent
RUN yarn add react-scripts@4.0.3 -g --silent

# add app
COPY . ./

# start app
CMD ["yarn", "run", "start"]
