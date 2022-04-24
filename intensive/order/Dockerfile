FROM node:alpine
WORKDIR /node/order

COPY package*.json ./
RUN npm install
COPY . .

ENV PRODUCT_URL=localhost:3333

EXPOSE 3336
CMD [ "npm", "start", "checkout_queue"]
# CMD [ "npm", "start", "payment_queue"]