import { 
  startConsumeCheckout, 
  startConsumePayment, 
  createChannelConn 
}  from './queue/queue';

const typeConsumeQueue = process.argv[2] || "checkout_queue"

// console.log(process.argv[2])

const run  = async() => {
  const channel = await createChannelConn();
  typeConsumeQueue == "payment_queue" ?
    startConsumePayment(channel, typeConsumeQueue)
  :
    startConsumeCheckout(channel, typeConsumeQueue, "order_ex")
}

run()