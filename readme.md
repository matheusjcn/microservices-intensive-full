### MICROSSERVIÇOS
---
Intensivo prático com microserviços.
As principais metodologias e estruturas
dessa tecnologia!!!
Seguindo as aulas, exemplos e metodologias do canal fullcycle.

```npm init -y```

```npm install express```

```npm i esm```

```npm i -D nodemon```

npm install ejs  

npm install amqplib --save

---

Add this code package.json:

- "start": "nodemon -r esm src/server.js" 

And run:

 - ```npm start```

---
## TECNOLOGIAS

- ### Node
- ### Docker

Stop container e imagens <br />

Contêineres:  docker container rm $(docker container ls -a -q) <br />

Imagens :      docker image rm $(docker image ls -a -q)<br />

docker exec -it -container-name- redis-cli <br />

- ### RabbitMQ

----
## Microsserviços
- ### Produtc
 Responsável por retornar os dados relacionados aos
produtos da nossa aplicação;

- ### Catalog
 Busca os dados, no serviço de product, e por meio de um template web os exibe em uma página;

- ### Checkout
 Responsável pela checkout, a preenchimento dos dados do cliente e chamada das conclusões de compra;<br />
 <br />
   criar exchange : checkout_ex; <br /> 
   criar queue : checkout_queue; <br />  [[[ checkout_ex - bind -> checkout_queue ]]]

<br />

 - ### Order
 Responsável pela checkout, a preenchimento dos dados do cliente e chamada das conclusões de compra.
 Escuta as filas de checkout para geram ordem: ```npm start checkout_queue``` <br />
 Escuta as filas de payment para salvar atualizacao: ```npm start payment_queue``` <br />
  <br />
   criar exchange : order_ex; <br /> 
   criar queue : order_queue; <br />  [[[ order_ex - bind -> order_queue ]]]

   
- ### Payment
Responsável pela aprovao do pagamento;
<br />
  criar exchange : payment_ex; <br /> 
  criar queue : payment_queue; <br />  [[[ payment_ex - bind -> payment_queue ]]]


---------------------------------------------------------------------------
---------------------------------------------------------------------------
///
/// NEXT STEPS

Kubernets
Aula 3 - 1:00:00 
---------------------------------------------------------------------------
---------------------------------------------------------------------------

