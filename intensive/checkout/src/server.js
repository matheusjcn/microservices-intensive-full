// import axios from 'axios';
import { env } from 'process';
import express from 'express';
import bodyParser from 'body-parser';

import queueNotify from './queue/queue'

const app = express();
const port = 3335;

app.set('view engine', 'ejs');
app.set('views', './templates');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var productURL = env.PRODUCT_URL || 'http://localhost:3333';

const productParse = {
  uuid: "9a118e4d-821a-44c7-accc-fa99ac4be01a",
  product: "Fenngreek Seed",
  price: "5.22"
};

const orderService = {
  product_id : 1,
  name : "client-name",
  email : "email@email.com",
  phone : "price",
}


// const loadAsyncView = async (id) => {
//   try{
//     const { data } = await axios.get(`${productURL}/products/${id}`); 
//     return data
//   } catch (err) {
//     console.log('Err : ', err)
//   }
// }
// app.get('/form/:id', (req, res) => {
//   async function loadShow() { 
//     const productFound = await loadAsyncView(req.params.id);
//     res.render('show', {productForm: productFound})
//   }
//   loadShow();
// });

// running data
app.get('/', (req, res) => {
  return res.send('[checkout] - running... -> go to /form');
})

app.get('/form', (req, res, next) => {
  res.render('form-client', {productForm: productParse})
})

app.post('/checkout', (req, res, next) => {

  const {uuid, username, useremail, userphone} = req.body;

  orderService.product_id = uuid;  
  orderService.name = username;
  orderService.email = useremail;
  orderService.phone = userphone; 

  queueNotify(orderService, "checkout_ex", "");

  return res.send(' -> [checkout] - send success');
});

app.listen(port,() => {
  console.log(`Servidor [checkout] rodando na porta ${port}`);
});

