function createAlertFromAnalysis(analysis, logData) {
  if (!analysis || !analysis.isSuspicious) {
    return null;
  }

  // Create a structured alert object for the database
  const alert = {
    severity: analysis.severity || 'Medium',
    description: analysis.reason || 'No description provided by AI.',
    source_ip: logData.source_ip || 'N/A',
    threat_type: analysis.threat_type || 'Uncategorized',
    ai_reason: analysis.reason || 'No AI reasoning provided',
  };

  return alert;
}

module.exports = { createAlertFromAnalysis };
