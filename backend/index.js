require('express-async-errors');
require('dotenv').config();
const express = require('express');
const authRouter = require('./routes/auth');
const jobRouter = require('./routes/jobs');
const notFound = require('./middlewares/notFound');
const errorHandler = require('./middlewares/errorHandler');
const connectDB = require('./db/connect');
const auth = require('./middlewares/authenticate');
const app = express();

app.use(express.json());
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', auth, jobRouter);
app.use(notFound);
app.use(errorHandler);

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(3000, () => console.log('Server is running'));
    } catch (err) {
        console.log(err);
    }
};

start();