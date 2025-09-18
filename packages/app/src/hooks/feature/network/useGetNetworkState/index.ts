import * as Network from "expo-network";
import { useCallback, useEffect, useState } from "react";

const useGetNetworkState = () => {
  const [networkState, setNetworkState] = useState<Network.NetworkState | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const getNetworkStateAsync = useCallback(async () => {
    setIsLoading(true);
    try {
      const state = await Network.getNetworkStateAsync();
      setNetworkState(state);
    } catch (e) {
      console.error("[useGetNetworkState] Error fetching network state:", e);
      setErrorMsg("Failed to fetch network state");
      return;
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getNetworkStateAsync();
  }, [getNetworkStateAsync]);

  return {
    networkState,
    isLoading,
    errorMsg,
  };
};

export default useGetNetworkState;
