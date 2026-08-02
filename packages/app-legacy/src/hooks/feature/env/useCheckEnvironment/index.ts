import { useMemo } from "react";

type ServerEnv = "mock" | "real";
type RunEnv = "development" | "production";

const useCheckEnvironment = () => {
  const RUN_ENV = useMemo(() => process.env.EXPO_PUBLIC_MODE as RunEnv, []);
  const SERVER_ENV = useMemo(
    () => process.env.EXPO_PUBLIC_SERVER_MODE as ServerEnv,
    [],
  );

  return {
    isMockServer: SERVER_ENV === "mock",
    isRealServer: SERVER_ENV === "real",
    isDevelopment: RUN_ENV === "development",
    isProduction: RUN_ENV === "production",
  };
};

export default useCheckEnvironment;
