const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.json(['😀', '😳', '🙄']);
});

router.get('/sam', (req, res) => {
  res.json(['Sam', '😳', '🙄']);
});

module.exports = router;
