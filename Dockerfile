FROM node:latest
RUN mkdir /app
COPY src /app/src
COPY public /app/public
COPY package.json /app

WORKDIR /app
RUN npm install
CMD ["npm", "start"]