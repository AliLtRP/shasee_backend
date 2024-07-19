const { Pool } = require('pg');

const pool = new Pool({
    host: "dpg-cqd445hu0jms73e8ahtg-a",
    database: "shasee",
    port: "5432",
    user: "ali",
    password: "nEKXpUA8l7e6sa2JsYE9si8CTNmDYjBX"
});

const connect = async() => {
    await pool.connect()
        .then(() => console.log('db connected'))
        .catch(e => console.log(e));
}

module.exports = {connect , pool};