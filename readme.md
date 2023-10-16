### Assimilando Microsserviços
---
Desenvolvido, acompanhando o intensivo prático de microserviços. Seguindo as aulas, exemplos e metodologias, do canal fullcycle.
Simulando uma simplificação de um sistema de compras.

---
#### TECNOLOGIAS

-  Node
-  Docker
-  RabbitMQ
-  Kubernets
----

### Serviços

![intensive-microservices-diagram](https://user-images.githubusercontent.com/38968482/168702468-553cba05-b171-4c47-9a55-22fb2effa473.png)


- #### Produtc
 Responsável por retornar os dados relacionados aos
produtos da nossa aplicação;

- #### Catalog
 Busca os dados, no serviço de product, e por meio de um template web os exibe em uma página;

- #### Checkout
 Responsável pela checkout, a preenchimento dos dados do cliente e chamada das conclusões de compra;<br />
 <br />
   criar exchange : checkout_ex; <br /> 
   criar queue : checkout_queue; <br />  [[[ checkout_ex - bind -> checkout_queue ]]]

 - #### Order
 Responsável pela checkout, e preenchimento dos dados do cliente e chamada das conclusões de compra.
 Escuta as filas de checkout para gerar ordem/pedido: ```npm start checkout_queue``` <br />
 Escuta as filas de payment para salvar atualização: ```npm start payment_queue``` <br />
  <br />
   criar exchange : order_ex; <br /> 
   criar queue : order_queue; <br />  [[[ order_ex - bind -> order_queue ]]]

   
- #### Payment
Responsável pela aprovação do pagamento;
<br />
  criar exchange : payment_ex; <br /> 
  criar queue : payment_queue; <br />  [[[ payment_ex - bind -> payment_queue ]]]


---------------------------------------------------------------------------
---------------------------------------------------------------------------
