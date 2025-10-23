import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite";

import { travelPathLogTable } from "../../schema/travelPathLogTable";

const expoDb = openDatabaseSync("navigation.db");
export const db = drizzle(expoDb, { schema: { travelPathLogTable } });
