const pool = require("../util/database");

export async function query(text, vals) {
  const client = await pool.connect();
  try {
    let res = await client.query(text, vals);
    client.release();
    return res;
  } catch (err) {
    client.release();
    throw err;
  }
}
