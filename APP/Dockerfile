FROM node:lts-alpine3.15

RUN npm install -g @angular/cli

WORKDIR /APP

COPY package.json package-lock.json /APP/

RUN npm install

COPY . /APP

CMD ["npm", "run", "start"]