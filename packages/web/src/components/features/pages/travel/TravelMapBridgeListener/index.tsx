"use client";

import { PolylineOptions } from "@/hooks/feature/map/useDrawPath";
import BridgeListener from "@entities/BridgeListener";
import { useState } from "react";

interface TravelMapBridgeListenerProps {
  children: ({ paths }: { paths: PolylineOptions[] }) => React.ReactNode;
}

export default function TravelMapBridgeListener({
  children,
}: TravelMapBridgeListenerProps) {
  const [paths, setPaths] = useState<PolylineOptions[]>([]);
  return (
    <>
      <BridgeListener
        onRequest={({ method, name, body }) => {
          if (name === "set-map-polyline" && method === "POST") {
            if (
              !body ||
              typeof body !== "object" ||
              !("paths" in body) ||
              !Array.isArray(body.paths) ||
              body.paths.length === 0
            ) {
              return {
                name: "set-map-polyline",
                status: "error",
                message: "Invalid request body",
              };
            }
            setPaths(body.paths);
            return {
              name: "set-map-polyline",
              status: "success",
            };
          }
          return {
            name,
            status: "error",
            message: "정의되지 않은 요청입니다",
          };
        }}
      />
      {children && children({ paths })}
    </>
  );
}
