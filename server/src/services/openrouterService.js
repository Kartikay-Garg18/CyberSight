const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

if (!OPENROUTER_API_KEY) {
  throw new Error('OPENROUTER_API_KEY is not set in .env file');
}

// Lazy initialize the OpenRouter client using dynamic import because
// the '@openrouter/sdk' package is distributed as an ES module.
let openRouterInstance = null;
async function getOpenRouter() {
  if (openRouterInstance) return openRouterInstance;
  const { OpenRouter } = await import('@openrouter/sdk');
  openRouterInstance = new OpenRouter({
    apiKey: OPENROUTER_API_KEY,
    defaultHeaders: {
      'HTTP-Referer': 'http://localhost:5000',
      'X-Title': 'CyberSight Threat Intelligence'
    }
  });
  return openRouterInstance;
}

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
    "reason": "Brief explanation of why this is suspicious or normal",
    "remediation": "Concrete, actionable steps to resolve or mitigate the issue"
  }

  Only respond with the JSON, no additional text.`;

    const openRouter = await getOpenRouter();

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
      reason: 'Unable to parse AI response',
      remediation: 'Review logs manually and ensure alerting thresholds are configured; increase logging verbosity if needed.'
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
    { keyword: 'failed', severity: 'High', type: 'Brute Force', reason: 'Multiple failed authentication attempts detected from single IP', remediation: 'Rate-limit login attempts, block offending IP, and require password resets for affected accounts.' },
    { keyword: 'unauthorized', severity: 'Critical', type: 'Unauthorized Access', reason: 'Unauthorized access attempt to restricted resources', remediation: 'Revoke compromised credentials, rotate affected keys, and review access control policies.' },
    { keyword: 'denied', severity: 'Medium', type: 'Access Denial', reason: 'Access denied to sensitive endpoint, possible reconnaissance', remediation: 'Harden endpoint permissions and monitor source IPs for repeated access attempts.' },
    { keyword: 'injection', severity: 'Critical', type: 'SQL Injection', reason: 'SQL injection pattern detected in request parameters', remediation: 'Sanitize inputs, use parameterized queries/ORM, and run a security scan of input handling code.' },
    { keyword: 'malicious', severity: 'Critical', type: 'Malware', reason: 'Malicious payload identified in request', remediation: 'Isolate affected hosts, run endpoint scans, and remove malicious artifacts; update signatures and block indicators of compromise.' },
    { keyword: 'scan', severity: 'Medium', type: 'Port Scan', reason: 'Port scanning activity detected from external IP', remediation: 'Block scanning IPs at the firewall and limit exposed services; enable network scanning detection.' },
    { keyword: 'ddos', severity: 'Critical', type: 'DDoS', reason: 'Distributed denial of service attack pattern identified', remediation: 'Engage DDoS mitigation (CDN/WAF), rate-limit traffic and consult upstream provider for filtering.' },
    { keyword: 'exploit', severity: 'Critical', type: 'Exploit Attempt', reason: 'Known exploit signature detected in traffic', remediation: 'Apply security patches, isolate affected systems, and perform incident response investigation.' },
  ];

  const logString = JSON.stringify(logData).toLowerCase();
  
  // Check for suspicious patterns
  for (const pattern of suspiciousPatterns) {
    if (logString.includes(pattern.keyword)) {
      return {
        isSuspicious: true,
        severity: pattern.severity,
        threat_type: pattern.type,
        reason: pattern.reason,
        remediation: pattern.remediation
      };
    }
  }

  // Random chance to mark as suspicious for demonstration (30% chance)
  if (Math.random() < 0.3) {
    const randomThreats = [
      { severity: 'Medium', type: 'Unusual Activity', reason: 'Abnormal traffic pattern detected from source IP', remediation: 'Investigate unusual IP, apply rate limits, and add to monitoring.' },
      { severity: 'High', type: 'Suspicious Behavior', reason: 'Unusual user agent and request headers detected', remediation: 'Block suspicious user agents, validate headers server-side, and require MFA for affected users.' },
      { severity: 'Low', type: 'Rate Limiting', reason: 'High request rate from single source, possible automation', remediation: 'Throttle requests from the source and implement CAPTCHA for suspicious flows.' },
    ];
    const random = randomThreats[Math.floor(Math.random() * randomThreats.length)];
    return {
      isSuspicious: true,
      severity: random.severity,
      threat_type: random.type,
      reason: random.reason,
      remediation: random.remediation
    };
  }

  // Normal activity
  return {
    isSuspicious: false,
    severity: 'Low',
    threat_type: 'Normal Activity',
    reason: 'Traffic pattern appears normal, no threats detected',
    remediation: 'No action required; continue monitoring.'
  };
}

module.exports = { analyzeLog };
