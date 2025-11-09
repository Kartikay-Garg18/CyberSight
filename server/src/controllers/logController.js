const { analyzeLog } = require('../services/openrouterService');
const { createAlertFromAnalysis } = require('../services/detectionService');
const { db, alerts } = require('../../db/drizzle');
// Corrected relative path to logger: from src/controllers -> ../../utils/logger
const logger = require('../../utils/logger');

async function processLog(req, res) {
  const logData = req.body;
  if (!logData) {
    return res.status(400).json({ error: 'Log data is required' });
  }

  try {
    // 1. Send log to OpenRouter AI for analysis
    const analysisResult = await analyzeLog(logData);

    // 2. Interpret the result and create a structured alert
    const newAlert = createAlertFromAnalysis(analysisResult, logData);

    // 3. If an alert was generated, save it and emit a WebSocket event
    if (newAlert) {
      const [savedAlert] = await db.insert(alerts).values(newAlert).returning();
      logger.info(`New alert saved: ${savedAlert.id}`);

      // Get io instance and emit event
      const io = req.app.get('io');
      io.emit('new-alert', savedAlert);
    }

    res.status(200).json({ status: 'Log processed', alert_generated: !!newAlert });
  } catch (error) {
    logger.error('Error processing log:', error);
    res.status(500).json({ error: 'Failed to process log' });
  }
}

module.exports = { processLog };
