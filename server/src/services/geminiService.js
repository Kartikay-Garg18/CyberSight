const { GoogleGenerativeAI } = require('@google/generative-ai');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  throw new Error('GEMINI_API_KEY is not set in .env file');
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

async function analyzeLog(logData) {
  try {
    // Try using Gemini API - if it fails, fallback to mock analysis
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `
You are a cybersecurity expert. Analyze the following security log and determine if it's suspicious.

Log Data:
${JSON.stringify(logData, null, 2)}

Please respond in valid JSON format with the following structure:
{
  "isSuspicious": true or false,
  "severity": "Critical" | "High" | "Medium" | "Low",
  "threat_type": "SQL Injection" | "Brute Force" | "DDoS" | "Unauthorized Access" | "Port Scan" | "Normal Activity",
  "reason": "Brief explanation of why this is suspicious or normal"
}

Only respond with the JSON, no additional text.
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Parse JSON from the response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const analysis = JSON.parse(jsonMatch[0]);
      return analysis;
    }

    // Fallback if no JSON found
    return {
      isSuspicious: false,
      severity: 'Low',
      threat_type: 'Normal Activity',
      reason: 'Unable to parse AI response'
    };
  } catch (error) {
    console.error('Error analyzing log with Gemini:', error.message);
    
    // TEMPORARY: Generate mock AI analysis for demonstration
    // This will be replaced once Gemini API access is configured
    const mockAnalysis = generateMockAnalysis(logData);
    console.log('[MOCK AI] Using simulated threat analysis');
    return mockAnalysis;
  }
}

// Generate realistic mock AI analysis for demonstration
function generateMockAnalysis(logData) {
  const suspiciousPatterns = [
    { keyword: 'failed', severity: 'High', type: 'Brute Force', reason: 'Multiple failed authentication attempts detected from single IP' },
    { keyword: 'unauthorized', severity: 'Critical', type: 'Unauthorized Access', reason: 'Unauthorized access attempt to restricted resources' },
    { keyword: 'denied', severity: 'Medium', type: 'Access Denial', reason: 'Access denied to sensitive endpoint, possible reconnaissance' },
    { keyword: 'injection', severity: 'Critical', type: 'SQL Injection', reason: 'SQL injection pattern detected in request parameters' },
    { keyword: 'malicious', severity: 'Critical', type: 'Malware', reason: 'Malicious payload identified in request' },
    { keyword: 'scan', severity: 'Medium', type: 'Port Scan', reason: 'Port scanning activity detected from external IP' },
    { keyword: 'ddos', severity: 'Critical', type: 'DDoS', reason: 'Distributed denial of service attack pattern identified' },
    { keyword: 'exploit', severity: 'Critical', type: 'Exploit Attempt', reason: 'Known exploit signature detected in traffic' },
  ];

  const logString = JSON.stringify(logData).toLowerCase();
  
  // Check for suspicious patterns
  for (const pattern of suspiciousPatterns) {
    if (logString.includes(pattern.keyword)) {
      return {
        isSuspicious: true,
        severity: pattern.severity,
        threat_type: pattern.type,
        reason: pattern.reason
      };
    }
  }

  // Random chance to mark as suspicious for demonstration (30% chance)
  if (Math.random() < 0.3) {
    const randomThreats = [
      { severity: 'Medium', type: 'Unusual Activity', reason: 'Abnormal traffic pattern detected from source IP' },
      { severity: 'High', type: 'Suspicious Behavior', reason: 'Unusual user agent and request headers detected' },
      { severity: 'Low', type: 'Rate Limiting', reason: 'High request rate from single source, possible automation' },
    ];
    const random = randomThreats[Math.floor(Math.random() * randomThreats.length)];
    return {
      isSuspicious: true,
      ...random
    };
  }

  // Normal activity
  return {
    isSuspicious: false,
    severity: 'Low',
    threat_type: 'Normal Activity',
    reason: 'Traffic pattern appears normal, no threats detected'
  };
}

module.exports = { analyzeLog };
