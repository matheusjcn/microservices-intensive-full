FROM node:alpine
WORKDIR /node/checkout

COPY package*.json ./
RUN npm install
COPY . .

ENV PRODUCT_URL=localhost:3335

EXPOSE 3335
CMD [ "npm", "start"]