//TODO: Import database
const { Pool } = require("pg");
const creds = require("../db-creds.json");

const pool = new Pool({
  host: creds.host, // The machine the db is on; For now, put localhost
  user: creds.username, // your username for the db
  password: creds.password, // your password for the db
  database: creds.database, // What specific db you want to access
  port: creds.port, // The port on which the db resides
});

pool.on("error", (err, client) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

// Setting the target schema
// pool.query("SET SCHEMA '" + creds.schema + "';", (err, res) => {
//     if (err) {
//       console.log(err.stack);
//     }
//   });

module.exports = pool;
