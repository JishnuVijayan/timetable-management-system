const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "adminpassword",
  host: "localhost",
  port: 5432,
  database: "timetablemanagement",
});

module.exports = pool;
