"use client";

import BridgeListener from "@shared/components/composites/BridgeListener";
import { useRouter } from "next/navigation";
import { useStackLinkBack } from "stack-link";

const GlobalBridgeListener = () => {
  // const router = useRouter();
  const { goBack } = useStackLinkBack();

  return (
    <BridgeListener
      onRequest={({ method, name, body }) => {
        if (name == "route-to" && method == "POST") {
          if (
            !body ||
            typeof body !== "object" ||
            !("url" in body) ||
            body.url == null ||
            typeof body.url !== "string" ||
            !("routeType" in body) ||
            body.routeType == null ||
            (body.routeType !== "push" &&
              body.routeType !== "replace" &&
              body.routeType !== "dismiss")
          ) {
            return {
              name,
              status: "error",
              data: "존재하지 않는 브리지 입니다.",
            };
          }

          const { url, routeType } = body;

          // const routeUrl = window.location.origin + url;

          // TODO: route를 stack link로 변경 및 올바르게 dismiss 처리 필요
          // if (routeType === "push") {
          //   router.push(routeUrl);
          // }
          // if (routeType === "replace") {
          //   router.replace(routeUrl);
          // }
          if (routeType === "dismiss") {
            goBack({
              animation: "slide",
            });
          }

          return { name, status: "success" };
        }
        return {
          name,
          status: "error",
          data: "존재하지 않는 브리지 입니다.",
        };
      }}
    />
  );
};

export default GlobalBridgeListener;
