const express = require('express');
const monk = require('monk');
const Joi = require('@hapi/joi');

// connect to mongodb
const db = monk(process.env.MONGO_URI);
const faqs = db.get('speedrun-crud-api');

// schema mongo
const schema = Joi.object({
    question: Joi.string().trim().required(),
    answer: Joi.string().trim().required(),
    video_url: Joi.string().uri(),
})

const router = express.Router();

// Read All
router.get('/', async (req, res, next) => {
    try {
        const items = await faqs.find({});
        res.json(items);
    } catch (error) {
        next(error);
    }
});

// Read One
router.get('/:id', (req, res, next) => {
    res.json({
        message: "Hello Read One"
    })
});

// Create One
router.post('/', async (req, res, next) => {
    try {
        const value = await schema.validateAsync(req.body);
        const inserted = await faqs.insert(value);
        res.json(inserted);
    } catch (error) {
        next(error);
    }
});

// Update One
router.put('/:id', (req, res, next) => {
    res.json({
        message: "Hello Update One"
    })
});

// Delete One
router.delete('/:id', (req, res, next) => {
    res.json({
        message: "Hello Delete One"
    })
});

module.exports = router;