require('express-async-errors');
const express = require('express');
const authRouter = require('./routes/auth');
const jobRouter = require('./routes/jobs');
const notFound = require('./middlewares/notFound');
const errorHandler = require('./middlewares/errorHandler');
const app = express();

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', jobRouter);
app.use(notFound);
app.use(errorHandler);

app.listen(3000, () => console.log('Server is running'));