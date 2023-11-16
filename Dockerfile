FROM node:20-alpine
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
RUN npm install @gomomento/sdk-web

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]