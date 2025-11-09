const express = require('express');
const router = express.Router();
const { db, alerts } = require('../db/drizzle');
const { desc } = require('drizzle-orm');

// Route to get all alerts, newest first
router.get('/', async (req, res) => {
  try {
    const allAlerts = await db.select().from(alerts).orderBy(desc(alerts.timestamp));
    res.json(allAlerts);
  } catch (error) {
    console.error('Error fetching alerts:', error);
    res.status(500).json({ error: 'Failed to fetch alerts' });
  }
});

module.exports = router;
