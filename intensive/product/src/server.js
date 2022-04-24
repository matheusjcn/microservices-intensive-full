import express from 'express';
import productsJSON from '../products.json';

const products = productsJSON['products'];

function getRandomProduct() {
  const randomIndex = Math.floor(Math.random() * products.length);
  const randomProduct = products[randomIndex];
  console.log(randomProduct);
}

function getProductById(id) {
  var product = products.find(item => 
    item.uuid == id
  );
  return product
}


const app = express();

app.get('/', (req, res) =>  {
  return res.send('0-api-products-running');
})

app.get('/products', (req, res) =>  {
  return res.json(products)
})

app.get('/products/:id', (req, res) =>  {
  const product = getProductById(req.params.id)
  return product 
    ? res.json(product)
    : res.status(404).send()
})


app.listen(3333);