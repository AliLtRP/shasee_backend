const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv').config();
const { dbConnection } = require('./db/database');
const authRouter = require('./routes/user.route');
const reportRouter = require('./routes/report.router');
const subRouter = require("./routes/sub.router");
const userReportRouter = require("./routes/user_report");
const port = process.env.PORT || 3000;

app.use(cors({
    origin: "*",
    credentials: true,
}));
app.use(express.json({ limit: '10mb' }));

app.use('/api/user', authRouter);
app.use('/api/report', reportRouter);
app.use('/api/sub', subRouter);
app.use('/api/user/report', userReportRouter);


app.get('/', (req, res) => {
    res.send('hello world')
});

dbConnection();
app.listen(port, () => console.log(`app is running ${port}`));