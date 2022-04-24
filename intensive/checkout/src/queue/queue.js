import amqp from 'amqplib/callback_api';


const dataConn = {
  // protocol: 'amqp',
  hostname: process.env.RABBITMQ_DEFAULT_HOST ||'localhost',
  port: process.env.RABBITMQ_DEFAULT_PORT || 5672,
  username: process.env.RABBITMQ_DEFAULT_USER || 'rabbitmq',
  password: process.env.RABBITMQ_DEFAULT_PASS ||'rabbitmq',
  // locale: 'en_US',
  // frameMax: 0,
  // heartbeat: 0,
  vhost: process.env.RABBITMQ_DEFAULT_VHOST || '/',
}

export default function queueNotify(payload, exchange, routingKey) {
  
  console.log(`connect - notiify function `);

  amqp.connect(`amqp://${dataConn.username}:${dataConn.password}@${dataConn.hostname}:${dataConn.port}${dataConn.vhost}`, 
  (err, conn)  =>  {

    conn.createChannel(function (err, ch) {
        var msg = process.argv.slice(2).join(' ') || JSON.stringify(payload)

        ch.assertExchange(exchange, 'direct', { durable: true })
        ch.publish(exchange, routingKey, Buffer.from(msg))
        
        console.log(`----------[sent-message]---------`)
        console.log(" [x] Sent %s", msg);
    });

    // setTimeout(function () { conn.close(); process.exit(0) }, 500);
  })
}



