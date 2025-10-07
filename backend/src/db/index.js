import { Pool } from 'pg';

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  connectionTimeoutMillis: 3000,  // give up connecting after 3s
  idleTimeoutMillis: 30000        // close idle clients after 30s
  //ssl: { rejectUnauthorized: false } // only if you hit SSL issues
});