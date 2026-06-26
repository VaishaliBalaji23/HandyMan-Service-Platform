import db from "../config/database.js"; // mysql2/promise pool/connection


/**
* Tables assumed:
*  auth(id INT AI PK, email VARCHAR UNIQUE, password VARCHAR, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)
*  users(id INT AI PK, first_name, last_name, email UNIQUE, role)
*/


export const findAuthByEmail = async (email) => {
 const [rows] = await db.query(
   "SELECT id, email, password FROM auth WHERE email = ? LIMIT 1",
   [email]
 );
 return rows?.[0] ?? null;
};


// Optional: if you have a users table and want role/name
export const findUserByEmail = async (email) => {
 try {
   const [rows] = await db.query(
     "SELECT first_name, last_name, email, role FROM users WHERE email = ? LIMIT 1",
     [email]
   );
   return rows?.[0] ?? null;
 } catch {
   return null; // if table doesn't exist yet, ignore
 }
};
