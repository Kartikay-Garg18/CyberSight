const axios = require('axios');

const API_URL = 'http://localhost:5000/api/logs';

const dummyLogs = [
  { type: 'firewall', source_ip: '192.168.1.10', action: 'allow', protocol: 'TCP' },
  { type: 'login', user: 'admin', source_ip: '10.0.0.5', status: 'success' },
  { type: 'webserver', method: 'GET', path: '/index.html', status: 200, source_ip: '203.0.113.45' },
  { type: 'webserver', method: 'GET', path: '/admin.php', status: 404, source_ip: '198.51.100.2' },
  // Suspicious logs
  { type: 'webserver', method: 'GET', path: "/?query=' OR 1=1; --", status: 500, source_ip: '198.51.100.88' },
  { type: 'login', user: 'root', source_ip: '103.77.22.1', status: 'failed' },
  { type: 'login', user: 'root', source_ip: '103.77.22.1', status: 'failed' },
  { type: 'firewall', source_ip: '45.137.21.101', action: 'deny', protocol: 'TCP', port: 22 },
];

async function sendLog() {
  try {
    const log = dummyLogs[Math.floor(Math.random() * dummyLogs.length)];
    console.log('Sending log:', log);
    await axios.post(API_URL, log);
    console.log('Log sent successfully.');
  } catch (error) {
    console.error('Error sending log:', error.message);
  }
}

// Send a log every 5 seconds
setInterval(sendLog, 5000);
