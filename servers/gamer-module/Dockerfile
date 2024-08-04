FROM node:latest

ENV NODE_ENV=production

WORKDIR /gamer-module

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

COPY . .

CMD ["node", "index.js"]