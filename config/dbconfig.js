const Pool = require('pg').Pool;

const pool = new Pool({
    user     : "postgres",
    host     : "localhost",
    database : "postgres",
    password : "suhel@17398",
    port     : 5432,
});

pool.connect((err) => {
    if(err) throw err;
    console.log("connected to database...");
})

module.exports = pool;