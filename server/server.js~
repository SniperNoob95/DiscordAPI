const express = require('express');
const apiRouter = require('./routes');
const bodyParser = require('body-parser');

const app = express();

const port = 80;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', apiRouter);

app.listen(port), () => {
    console.log(`Server is listening on port ${port}`);
}