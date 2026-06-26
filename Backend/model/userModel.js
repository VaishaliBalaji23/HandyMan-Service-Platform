import db from "../config/database.js";


/** Wrap a function in a DB transaction */
export async function withTransaction(fn) {
 const conn = await db.getConnection();
 try {
   await conn.beginTransaction();
   const result = await fn(conn);
   await conn.commit();
   return result;
 } catch (e) {
   await conn.rollback();
   throw e;
 } finally {
   conn.release();
 }
}


/** Existence checks */
export async function emailExistsInUsers(email) {
 const [rows] = await db.execute("SELECT 1 FROM users WHERE email = ? LIMIT 1", [email]);
 return rows.length > 0;
}
export async function emailExistsInAuth(email) {
 const [rows] = await db.execute("SELECT 1 FROM auth WHERE email = ? LIMIT 1", [email]);
 return rows.length > 0;
}


/** Create user (optionally using a provided connection for tx) */
export async function createUser(connOrDb, { first_name, last_name, email, phone_number, role }) {
 const cx = connOrDb || db;
 const [res] = await cx.execute(
   "INSERT INTO users (first_name, last_name, email, phone_number, role) VALUES (?, ?, ?, ?, ?)",
   [first_name, last_name, email, phone_number || null, role]
 );
 return res.insertId;
}


/** Create auth row */
export async function createAuth(connOrDb, { email, password }) {
 const cx = connOrDb || db;
 const [res] = await cx.execute(
   "INSERT INTO auth (email, password) VALUES (?, ?)",
   [email, password]
 );
 return res.insertId;
}


export async function getAllUsers() {
 const [rows] = await db.execute(
   "SELECT id, first_name, last_name, email, phone_number, role, created_at FROM users ORDER BY id DESC"
 );
 return rows;
}


export async function getUserById(id) {
 const [rows] = await db.execute(
   "SELECT id, first_name, last_name, email, phone_number, role, created_at FROM users WHERE id = ? LIMIT 1",
   [id]
 );
 return rows[0] || null;
}


export async function updateUser(connOrDb, id, { first_name, last_name, email, phone_number, role }) {
 const cx = connOrDb || db;
 const [res] = await cx.execute(
   "UPDATE users SET first_name = ?, last_name = ?, email = ?, phone_number = ?, role = ? WHERE id = ?",
   [first_name, last_name, email, phone_number || null, role, id]
 );
 return res.affectedRows;
}


export async function updateAuthEmail(connOrDb, oldEmail, newEmail) {
 const cx = connOrDb || db;
 const [res] = await cx.execute(
   "UPDATE auth SET email = ? WHERE email = ?",
   [newEmail, oldEmail]
 );
 return res.affectedRows;
}


export async function deleteUser(id) {
 const [res] = await db.execute("DELETE FROM users WHERE id = ?", [id]);
 return res.affectedRows;
}




export async function getUserByEmail(email) {
 const [rows] = await db.execute(
   "SELECT id, first_name, last_name, email, phone_number, role, created_at FROM users WHERE email = ? LIMIT 1",
   [email]
 );
 return rows[0] || null;
}
