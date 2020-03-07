const express = require('express');
const apiRouter = require('./routes');

const app = express();

const port = 80;

app.use(express.json());

app.use('/api/test/', apiRouter);

app.listen(port), () => {
    console.log('Server is listening on port ${port}');
}