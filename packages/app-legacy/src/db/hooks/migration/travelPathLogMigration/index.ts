import { travelPathLogMigrateDb } from "@db/migration/travelPathLogMigration";
import { useEffect, useState } from "react";

const useTravelPathLogMigration = () => {
  const [dbReady, setDbReady] = useState(false);

  useEffect(() => {
    travelPathLogMigrateDb()
      .then(() => setDbReady(true))
      .catch(console.error);
  }, []);

  return { dbReady };
};

export default useTravelPathLogMigration;
