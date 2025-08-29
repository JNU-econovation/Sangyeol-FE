"use client";

import ROUTE from "@/constants/route";
import SearchInput from "@shared/ui/SearchInput";
import { StackLink, useStackLinkRouter } from "stack-link";

export default function MountainSearchBarSection() {
  const { navigate } = useStackLinkRouter({
    prefetchHref: ROUTE.MOUNTAIN_SEARCH,
  });
  return (
    <StackLink href={ROUTE.MOUNTAIN_SEARCH} animation="none" preLoad>
      <SearchInput
        placeholder="산 이름을 입력해주세요"
        onFocus={() =>
          navigate({ href: ROUTE.MOUNTAIN_SEARCH, animation: "none" })
        }
        onClick={() =>
          navigate({ href: ROUTE.MOUNTAIN_SEARCH, animation: "none" })
        }
      />
    </StackLink>
  );
}
