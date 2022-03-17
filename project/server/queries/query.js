const pool = require("../util/database");

export async function query(text, vals) {
  const client = await pool.connect();
  client
    .query(text, vals)
    .then((res) => {
      client.release();
      return res;
    })
    .catch((err) => {
      throw err;
    });
}
