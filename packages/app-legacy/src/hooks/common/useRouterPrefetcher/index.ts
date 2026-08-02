import { Href, router } from "expo-router";
import { useEffect } from "react";

interface UseRouterPrefetcherProps {
  routes: Href | Href[];
}

const useRouterPrefetcher = ({ routes }: UseRouterPrefetcherProps) => {
  useEffect(() => {
    if (Array.isArray(routes)) {
      routes.forEach((route) => router.prefetch(route));
      return;
    }
    router.prefetch(routes);
  }, []);
};

export default useRouterPrefetcher;
