const express = require('express');
const db = require('../db');

const router = express.Router();

router.post('/test', async (req, res, next) => {
    values = [req.body.field1, req.body.field2];
    console.log(values);
    console.log(req.body.field2);
    try {
        let results = await db.testDB.insert(values)
    } catch(err) {
        res.status(500).send("Unable to perform insert.");
        console.log(err);
    }
});

router.get('/health', async (req, res, next) => {
    res.json({healthcheck : "responsive"});
});

router.get('/sales', async (req, res, next) => {
    try {
        let results = await db.salesDB.all();
        res.json(results);
    } catch(err) {
        res.status(500).send("Unable to connect to API.")
        console.log(err);
    }
});

router.get('/sales/:id', async (req, res, next) => {
    try {
        let results = await db.salesDB.one(req.params.id);
        res.json(results);
    } catch(err) {
        res.sendStatus(500);
        console.log(err);
    }
});

router.get('/messages/count/:id', async (req, res, next) => {
    try {
        let results = await db.messagesDB.count(req.params.id);
        res.json(results);
    } catch(err) {
        res.sendStatus(500);
        console.log(err);
    }
});

router.get('/messages/count', async (req, res, next) => {
    try {
        let results = await db.messagesDB.total();
        res.json(results);
    } catch(err) {
        res.sendStatus(500);
        console.log(err);
    }
});


module.exports = router;