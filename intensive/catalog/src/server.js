import axios from 'axios';
import { env } from 'process';
import express from 'express';

const app = express();
const port = 3334;

app.set('view engine', 'ejs');
app.set('views', './templates');

var productURL = env.PRODUCT_URL || 'http://localhost:3333';

const loadAsyncList = async () => {
  try{
    const { data } = await axios.get(`${productURL}/products`);  
    return data
  } catch (err) {
    console.log('Err : ', err)
  }
}


const loadAsyncView = async (id) => {
  try{
    const { data } = await axios.get(`${productURL}/products/${id}`); 
    return data
  } catch (err) {
    console.log('Err : ', err)
  }
}


app.get('/catalog', (req, res) => {
  async function loadList() {
    const response = await loadAsyncList();
    res.render('list', {products: response})
  };
  loadList()
});

app.get('/catalog/:id', (req, res) => {
  async function loadShow() { 
    const {product, price} = await loadAsyncView(req.params.id);
    res.render('show', {name: product, price:price});
  }
  loadShow();
});

app.listen(port,() => {
  console.log(`Servidor rodando na porta ${port}`);
});