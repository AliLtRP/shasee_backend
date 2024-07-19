const express = require('express');
const app = express();

const cors = require('cors');
const dotenv = require('dotenv').config();
const { dbConnection } = require('./db/database');
const authRouter = require('./routes/user.route');

app.use(cors({
    origin: "*",
    credentials: true,
    allowedHeaders: [""]
}));
app.use(express.json({ limit: '10mb' }));

app.use('/api/user', authRouter);

app.get('/', (req, res) => {
    res.send('hello world')
});

dbConnection();
app.listen(3000, () => console.log("app is running"));