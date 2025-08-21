"use client";

import useKakaoLoginQuery from "@hooks/feature/query/query/useKakaoLoginQuery";
import { ErrorBoundary, Suspense } from "@suspensive/react";

import ErrorFallback from "./error";
import KakaoLoginSectionLoader from "./loader";

export default ErrorBoundary.with(
  {
    fallback: <ErrorFallback />,
  },
  Suspense.with(
    {
      fallback: <KakaoLoginSectionLoader />,
      clientOnly: true,
      name: "KakaoLoginSection",
    },
    () => {
      const { data } = useKakaoLoginQuery();

      if ((data && data.uri) || typeof window !== "undefined") {
        const { uri } = data;
        window.location.href = uri;
        return null;
      }

      return null;
    }
  )
);
