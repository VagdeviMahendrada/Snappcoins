# syntax=docker/dockerfile:1

FROM node:latest
ENV NODE_ENV=production

ENV MONGO_URI=mongodb+srv://Incrivelsoft:Incrivelsoft%40sh@smarthealth.nwut0dh.mongodb.net/test?retryWrites=true&w=majority
ENV ACCESS_TOKEN_SECRET=$2b$10$ihwmWDEir5KPienVM1Zoh.cECTKt.lm4eXRdeIBBL4/HPspblQhSW
ENV AUTH_EMAIL=Info@incrivelsoft.com
ENV AUTH_PASS=Incrivelsoft@emails
# ENV PORT=3003

WORKDIR /Snappcoins/servers/merchant-module

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

COPY . .

# EXPOSE 3003

CMD ["node", "index.js"]