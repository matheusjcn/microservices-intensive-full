import amqp from 'amqplib';
import { v4 as uuidv4 } from 'uuid';
import { connectDB } from '../db/db';

const dataConn = {
  hostname: process.env.RABBITMQ_DEFAULT_HOST ||'localhost',
  port: process.env.RABBITMQ_DEFAULT_PORT || 5672,
  username: process.env.RABBITMQ_DEFAULT_USER || 'rabbitmq',
  password: process.env.RABBITMQ_DEFAULT_PASS ||'rabbitmq',
  vhost: process.env.RABBITMQ_DEFAULT_VHOST || '/',
}

const saveOrder = (order, channel) => {
  
  const redisClient = connectDB();
  
  const save = async () => {
    redisClient.connect();
    const result = await redisClient.set(order.uuid, JSON.stringify(order));

    console.log(`[SAVE] - result: ${result}`);
  }
  save();
}


export const createChannelConn = async () => {
  const conn = await amqp.connect(`amqp://${dataConn.username}:${dataConn.password}@${dataConn.hostname}:${dataConn.port}${dataConn.vhost}`)
  const channel = await conn.createChannel()
  return channel;
}

export function startConsumeCheckout(channel, queueName, exchangeName) {

  const run = async () => {
    await channel.assertQueue(queueName)

    console.log(`[Order][Consuming] -> Queue [ ${queueName} ] - \n`);
    
    channel.consume(queueName,  (msg) => {
      
      const parseMessage = JSON.parse(msg.content.toString());
      parseMessage.uuid = uuidv4();
      parseMessage.status = `pendente`;
      parseMessage.created_at = Date.now().toString()

      console.log(`-*-*-*-*-*-*-[receive-message]-*-*-*-*-*-*-`)
      console.log(`${msg.content.toString()}\n`)

      saveOrder(parseMessage, channel);
      notifyOrderCreated(channel, parseMessage, exchangeName, ``)

    }, { noAck: true });
  }
  run()
};


export function startConsumePayment(channel, queueName) {

  const run = async () => {
    await channel.assertQueue(queueName)

    console.log(`[Order][Consuming] -> Queue [ ${queueName} ] - \n`);
    
    channel.consume(queueName,  (msg) => {
      const parseMessage = JSON.parse(msg.content.toString());
      console.log(`-*-*-*-*-*-*-[receive-message]-*-*-*-*-*-*-`)
      console.log(`${msg.content.toString()}\n`)

      saveOrder(parseMessage, channel);

    }, { noAck: true });
  }
  run()
};


function notifyOrderCreated(channel, payload, exchange, routingKey) {
   
  var msg = process.argv.slice(2).join(' ') || JSON.stringify(payload);

  channel.assertExchange(exchange, 'direct', { durable: true });
  channel.publish(exchange, routingKey, Buffer.from(msg));
  console.log(`----------[sent-message]---------`)
  console.log(` [${exchange}] Sent message : \n ${msg}\n`);
}

