const express = require('express');
const router = express.Router();
const { processLog } = require('../src/controllers/logController');

// Route to handle incoming logs
router.post('/', processLog);

module.exports = router;
