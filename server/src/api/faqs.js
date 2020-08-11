const express = require('express');
const monk = require('monk');
const Joi = require('@hapi/joi');
const { json } = require('express');

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
router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const item = await faqs.findOne({
            _id: id,
        });
        if (!item) {
            return next();
        }
        return res.json(item);
    } catch (error) {
        next(error);
    }
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
router.put('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const item = await faqs.findOne({
            _id: id,
        });
        if (!item) return next();

        const value = await schema.validateAsync(req.body);

        await faqs.update({
            _id: id,
        },{
            $set: value
        });
        res.json(value);
    } catch (error) {
        next(error);
    }
});

// Delete One
router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        await faqs.remove({
            _id: id
        });
        res.json({
            message: "success deleted."
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;