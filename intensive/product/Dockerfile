FROM node:alpine
WORKDIR /node/products

COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 3333
CMD [ "npm", "start"]