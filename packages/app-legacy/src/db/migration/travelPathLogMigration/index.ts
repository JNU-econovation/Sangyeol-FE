import { sql } from "drizzle-orm";

import { db } from "../../client/travelPathLogClient";

export async function travelPathLogMigrateDb() {
  try {
    await db.run(sql`
      CREATE TABLE IF NOT EXISTS location_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        coordinates TEXT NOT NULL,
        timestamp INTEGER NOT NULL
      );
    `);

    await db.run(sql`
      CREATE INDEX IF NOT EXISTS idx_timestamp ON location_logs(timestamp);
    `);

    console.log("Database migration completed");
  } catch (error) {
    console.error("Database migration failed:", error);
    throw error;
  }
}
