const Pool = require("pg").Pool;


const pool = new Pool({
    user: "abtester",
    password: "abtest",
    host: "localhost",
    port: 5432,
    database: "abtest"
});

module.exports = pool;