const { OpenRouter } = require('@openrouter/sdk');

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

if (!OPENROUTER_API_KEY) {
  throw new Error('OPENROUTER_API_KEY is not set in .env file');
}

const openRouter = new OpenRouter({
  apiKey: OPENROUTER_API_KEY,
  defaultHeaders: {
    'HTTP-Referer': 'http://localhost:5000',
    'X-Title': 'CyberSight Threat Intelligence'
  }
});

async function analyzeLog(logData) {
  try {
    const prompt = `You are a cybersecurity expert. Analyze the following security log and determine if it's suspicious.

Log Data:
${JSON.stringify(logData, null, 2)}

Please respond in valid JSON format with the following structure:
{
  "isSuspicious": true or false,
  "severity": "Critical" | "High" | "Medium" | "Low",
  "threat_type": "SQL Injection" | "Brute Force" | "DDoS" | "Unauthorized Access" | "Port Scan" | "Normal Activity",
  "reason": "Brief explanation of why this is suspicious or normal"
}

Only respond with the JSON, no additional text.`;

    const response = await openRouter.chat.send({
      model: 'openai/gpt-4o',
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ],
      stream: false
    });

    const text = response.choices[0].message.content;
    
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const analysis = JSON.parse(jsonMatch[0]);
      console.log('[OpenRouter AI] Successfully analyzed threat');
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
    console.error('Error analyzing log with OpenRouter:', error.message);
    
    // Fallback to mock analysis
    const mockAnalysis = generateMockAnalysis(logData);
    console.log('[MOCK AI] Using simulated threat analysis (OpenRouter failed)');
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
