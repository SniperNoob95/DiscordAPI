import express, { json } from 'express';
import apiRouter from './routes';

const app = express();

const port = 80;

app.use(json());

app.use('/api', apiRouter);

app.listen(port), () => {
    console.log(`Server is listening on port ${port}`);
}