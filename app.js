const express = require('express');
const app = express();

const cors = require('cors');
const dotenv = require('dotenv').config();
const {connect} = require('./db/database');


app.use(cors({
    origin: "*",
    credentials: true,
    allowedHeaders: [""]
}));

app.get('/', (req, res) => {
    res.send('hello world')
});

connect();
app.listen(3000, () => console.log("app is running"));