FROM node:alpine
WORKDIR /node/checkout

COPY package*.json ./
RUN npm install
COPY . .

# ENV PRODUCT_URL=localhost:3333

EXPOSE 3335
CMD [ "npm", "start"]