const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/health', async (req, res, next) => {
    res.json({healthcheck : "responsive"});
});

router.get('/sales', async (req, res, next) => {
    try {
        let results = await db.all();
        res.json(results);
    } catch(err) {
        res.sendStatus(500);
        console.log(err);
    }
});

router.get('/sales/:id', async (req, res, next) => {
    try {
        let results = await db.one(req.params.id);
        res.json(results);
    } catch(err) {
        res.sendStatus(500);
        console.log(err);
    }
});

router.get('/messages/count/:id', async (req, res, next) => {
    try {
        let results = await db.count(req.params.id);
        res.json(results);
    } catch(err) {
        res.sendStatus(500);
        console.log(err);
    }
});


module.exports = router;