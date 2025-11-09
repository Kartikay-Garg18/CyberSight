const express = require('express');
const router = express.Router();
const threatController = require('../controllers/threatController');

// Route to get all threats
router.get('/threats', threatController.getAllThreats);

// Route to get a specific threat by ID
router.get('/threats/:id', threatController.getThreatById);

// Route to create a new threat
router.post('/threats', threatController.createThreat);

// Route to update an existing threat
router.put('/threats/:id', threatController.updateThreat);

// Route to delete a threat
router.delete('/threats/:id', threatController.deleteThreat);

module.exports = router;