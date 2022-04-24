import { createClient } from 'redis';

export function connectDB () {
    const client = createClient({
      host: 'localhost',
      port: '6379',
      password: ''
    });

    client.on('error', (err) => console.log('Redis Client Error: ', err));
    // console.log(`\n-\n REDIS CONNECTED \n-`)
    
    // await client.connect();
    return client
  
}