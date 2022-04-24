// import axios from 'axios';
import { env } from 'process';
import { startConsume, createChannelConn } from './queue/queue';

const productURL = env.PRODUCT_URL || 'http://localhost:3333';

const run  = async() => {
  const channel = await createChannelConn();
  startConsume(channel, "order_queue","payment_ex");
}

run()