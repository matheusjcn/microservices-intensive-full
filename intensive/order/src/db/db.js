import { createClient } from 'redis';
import { env } from 'process';

const redisHost = env.REDIS_HOST || 'localhost'
const redisPort = env.REDIS_PORT || '6379'

export function connectDB () {
    const client = createClient({
      host: redisHost,
      port: redisPort,
      password: ''
    });

    client.on('error', (err) => console.log(`Redis [Client ${redisHost}:${redisPort}] Error: `, err));
  
    client.on('connect', () => console.log('Connected to Redis') )
    // await client.connect();
    return client
  }