FROM node:alpine
WORKDIR /node/catalog

COPY package*.json ./
RUN npm install
COPY . .

# ENV PRODUCT_URL=localhost:3333

EXPOSE 3334
CMD [ "npm", "start"]