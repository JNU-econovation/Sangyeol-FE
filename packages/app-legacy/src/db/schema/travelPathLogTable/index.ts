// db/schema.ts
import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";

export const travelPathLogTable = sqliteTable("travelPathTable", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  coordinates: text("coordinates").notNull(), // JSON 문자열로 [lon, lat] 저장
  timestamp: integer("timestamp").notNull(),
});

export type LocationLog = typeof travelPathLogTable.$inferSelect;
export type NewLocationLog = typeof travelPathLogTable.$inferInsert;
