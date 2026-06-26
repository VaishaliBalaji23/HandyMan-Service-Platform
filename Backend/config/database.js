// config/database.js
import mysql from "mysql2/promise";

// If you set envs later, these fallbacks match XAMPP defaults
const host = process.env.DB_HOST || "localhost";
const port = Number(process.env.DB_PORT || 3306);   // check XAMPP port
const user = process.env.DB_USER || "root";
const password = process.env.DB_PASS || "";         // XAMPP default = empty
const database = process.env.DB_NAME || "handyman_db";

const pool = mysql.createPool({
  host,
  port,
  user,
  password,
  database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  // You can add timezone/options if needed:
  // timezone: 'Z',
  // supportBigNumbers: true,
  // dateStrings: true,
});

async function testConnection() {
  try {
    const conn = await pool.getConnection();
    await conn.ping(); // lightweight check
    console.log("✅ MySQL (XAMPP) connected successfully!");
    conn.release();
  } catch (err) {
    console.error("❌ Database connection failed:", err.message);
  }
}
testConnection();

export default pool;