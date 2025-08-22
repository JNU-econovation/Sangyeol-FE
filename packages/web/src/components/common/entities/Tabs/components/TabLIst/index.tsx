/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { isValidElement, memo, useEffect } from "react";
import useTabContext from "../../hooks/useTabContext";
import type { TabListProps } from "../../types";
export default memo(function TabList({ children }: TabListProps) {
  const { setTabItemsHandler } = useTabContext();

  if (!children || children.length === 0) {
    throw new Error(
      "TabList는 최소한 하나의 자식 요소를 가져야 합니다. <Tab/> 컴포넌트를 추가하세요."
    );
  }

  useEffect(() => {
    setTabItemsHandler(
      children.map((child) => {
        if (isValidElement(child) && (child.props as any)?.label) {
          return (child.props as any).label;
        }
        throw new Error(
          "TabList의 자식 요소는 유효한 React 요소여야 하며, label 속성을 가져야 합니다."
        );
      })
    );
  }, [children]);

  return (
    <div className="flex overflow-y-scroll hide-scrollbar">{children}</div>
  );
});
