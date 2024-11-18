FROM node:alpine as base

WORKDIR /app

COPY package.json ./

RUN rm -rf node_modules && npm install

COPY . .

# Expose Application Port
EXPOSE 3004

CMD ["node", "./app.js"]
