FROM node:16.17.0

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

USER node

EXPOSE 3000

CMD ["/app/start.sh"]