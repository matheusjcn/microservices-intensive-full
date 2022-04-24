import amqp from 'amqplib';
// import { connectDB } from '../db/db';

const dataConn = {
  hostname: process.env.RABBITMQ_DEFAULT_HOST ||'localhost',
  port: process.env.RABBITMQ_DEFAULT_PORT || 5672,
  username: process.env.RABBITMQ_DEFAULT_USER || 'rabbitmq',
  password: process.env.RABBITMQ_DEFAULT_PASS ||'rabbitmq',
  vhost: process.env.RABBITMQ_DEFAULT_VHOST || '/',
}

// const saveOrder = (order, channel) => {
  
//   // const redisClient = connectDB();
  
//   const save = async () => {
//     redisClient.connect();
//     const result = await redisClient.set(order.uuid, JSON.stringify(order));
    
//     notifyOrderCreated(channel, order, `order_ex`, ``)

//     console.log(`[SAVE] - result: ${result}`);
//   }
//   save();
// }


export const createChannelConn = async () => {
  const conn = await amqp.connect(`amqp://${dataConn.username}:${dataConn.password}@${dataConn.hostname}:${dataConn.port}${dataConn.vhost}`)
  const channel = await conn.createChannel()
  return channel
}

export function startConsume(channel, queueName) {

  const run = async () => {
    await channel.assertQueue(queueName)

    console.log(`[Payment][Consuming] -> Queue [ ${queueName} ] - \n`);
    
    channel.consume(queueName,  (msg) => {

      console.log(`\n\n\n`);
      console.log(msg.content.toString())
      
      const parseMessage = JSON.parse(msg.content.toString());
      console.log(`-*-*-*-*-*-*-[receive-message]-*-*-*-*-*-*-`)
      console.log(`${msg.content.toString()}\n`);

      parseMessage.status = `aprovado`
      console.log(`...\n- Cartao Aprovado!! -\n...`)
      
      notifyOrderCreated(channel, parseMessage, `payment_ex`, ``);

    }, { noAck: true })
  }
  run()
};


function notifyOrderCreated(channel, payload, exchange, routingKey) {
   
  var msg = process.argv.slice(2).join(' ') || JSON.stringify(payload)

  channel.assertExchange(exchange, 'direct', { durable: true })
  channel.publish(exchange, routingKey, Buffer.from(msg))
  console.log(`----------[sent-message]---------`)
  console.log(` [${exchange}] Sent message :  ${msg}\n`)
}

