import { startConsume, createChannelConn } from './queue/queue';

const run  = async() => {
  const channel = await createChannelConn();
  startConsume(channel, "order_queue","payment_ex");
}

run()