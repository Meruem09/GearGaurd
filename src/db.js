// test-db.js
import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

async function testConnection() {
  try {
    const result = await pool.query("SELECT 1");
    console.log("✅ NeonDB connected successfully:", result.rows);
    process.exit(0);
  } catch (err) {
    console.error("❌ NeonDB connection failed:", err.message);
    process.exit(1);
  }
}

testConnection();
