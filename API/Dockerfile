FROM node:lts-alpine3.15

WORKDIR /API

COPY package.json package-lock.json /API/

RUN npm install

COPY . /API

CMD ["npm", "run", "start"]
