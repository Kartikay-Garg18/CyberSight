const { client } = require('./db/drizzle');

async function createTables() {
  try {
    console.log('Creating alerts table...');
    
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
    
    console.log('✅ Alerts table created successfully!');
    
    // Create an index on timestamp for faster queries
    await client`
      CREATE INDEX IF NOT EXISTS idx_alerts_timestamp ON alerts(timestamp DESC)
    `;
    
    console.log('✅ Index created successfully!');
    
  } catch (error) {
    console.error('❌ Error creating tables:', error);
  } finally {
    await client.end();
    process.exit();
  }
}

createTables();
