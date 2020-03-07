import { Router } from 'express';

import { all, one } from '../db';

const router = Router();

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



export default {
    router
}