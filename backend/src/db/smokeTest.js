import 'dotenv/config';        // loads .env
console.log('DATABASE_URL:', process.env.DATABASE_URL); // ← must print your Neon URL

import { Client } from 'pg';
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

try {
  await client.connect();
  const { rows } = await client.query('SELECT NOW() AS now');
  console.log('DB OK, time:', rows[0].now);
} catch (e) {
  console.error('DB FAIL:', e.code || e.message, e);
} finally {
  await client.end();
}