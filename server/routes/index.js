import { Router } from 'express';

import { all, one, count } from '../db';

const router = Router();

router.get('/health', async (req, res, next) => {
    res.json({healthcheck : "responsive"});
});

router.get('/sales', async (req, res, next) => {
    try {
        let results = await all();
        res.json(results);
    } catch(err) {
        res.sendStatus(500);
        console.log(err);
    }
});

router.get('/sales/:id', async (req, res, next) => {
    try {
        let results = await one(req.params.id);
        res.json(results);
    } catch(err) {
        res.sendStatus(500);
        console.log(err);
    }
});

router.get('/messages/count/:id', async (req, res, next) => {
    try {
        let results = await count(req.params.id);
        res.json(results);
    } catch(err) {
        res.sendStatus(500);
        console.log(err);
    }
});


export default {
    router
}