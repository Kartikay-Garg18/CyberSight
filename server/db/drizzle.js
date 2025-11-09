const { drizzle } = require('drizzle-orm/postgres-js');
const { pgTable, serial, text, varchar, timestamp } = require('drizzle-orm/pg-core');
const postgres = require('postgres');
require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set in .env file');
}

// Define the schema for the 'alerts' table
const alerts = pgTable('alerts', {
  id: serial('id').primaryKey(),
  severity: varchar('severity', { length: 50 }).notNull(),
  description: text('description').notNull(),
  source_ip: varchar('source_ip', { length: 50 }),
  threat_type: varchar('threat_type', { length: 100 }),
  ai_reason: text('ai_reason'),
  timestamp: timestamp('timestamp').defaultNow().notNull(),
});

const client = postgres(process.env.DATABASE_URL, { ssl: 'require' });
const db = drizzle(client);

module.exports = { db, alerts, client };
