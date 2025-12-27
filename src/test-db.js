import { pool } from './db.js';

async function testConnection() {
  try {
    const client = await pool.connect();
    console.log('Connected to NeonDB successfully!');
    const result = await client.query('SELECT NOW()');
    console.log('Current time from database:', result.rows[0]);
    client.release();
    pool.end();
  } catch (error) {
    console.error('Error connecting to NeonDB:', error);
  }
}

testConnection();