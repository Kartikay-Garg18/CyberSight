require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const logRoutes = require('./routes/logs');
const alertRoutes = require('./routes/alerts');
const logger = require('./utils/logger');
const { client } = require('./db/drizzle');

const app = express();
const server = http.createServer(app);

// Setup Socket.IO with CORS
const io = new Server(server, {
  cors: {
    origin: "https://cyber-sight.vercel.app",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Make io accessible to our routes
app.set('io', io);

// Initialize database table
async function initializeDatabase() {
  try {
    logger.info('Checking database tables...');
    await client`
      CREATE TABLE IF NOT EXISTS alerts (
        id SERIAL PRIMARY KEY,
        severity VARCHAR(50) NOT NULL,
        description TEXT NOT NULL,
        source_ip VARCHAR(50),
        threat_type VARCHAR(100),
        ai_reason TEXT,
        timestamp TIMESTAMP DEFAULT NOW() NOT NULL
      )
    `;
    await client`
      CREATE INDEX IF NOT EXISTS idx_alerts_timestamp ON alerts(timestamp DESC)
    `;
    logger.info('Database tables ready ✅');
  } catch (error) {
    logger.error('Database initialization error:', error);
  }
}

// Routes
app.use('/api/logs', logRoutes);
app.use('/api/alerts', alertRoutes);

// Socket.IO connection
io.on('connection', (socket) => {
  logger.info('A user connected to WebSocket');
  socket.on('disconnect', () => {
    logger.info('User disconnected');
  });
});

const PORT = process.env.PORT || 5000;

// Initialize database and start server
initializeDatabase().then(() => {
  server.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
  });
});