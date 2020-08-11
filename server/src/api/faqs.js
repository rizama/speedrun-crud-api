const express = require('express');

const router = express.Router();

// Read All
router.get('/', (req, res, next) => {
    res.json({
        message: "Hello Read All"
    })
});

// Read One
router.get('/:id', (req, res, next) => {
    res.json({
        message: "Hello Read One"
    })
});

// Create One
router.post('/', (req, res, next) => {
    res.json({
        message: "Hello Create One"
    })
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