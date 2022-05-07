FROM node:alpine
WORKDIR /node/checkout

COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 3337
CMD [ "npm", "start"]