import ROUTE from "@/constants/route";
import SearchInput from "@shared/ui/SearchInput";
import { StackLink } from "stack-link";

export default function MountainSearchBarSection() {
  return (
    <StackLink href={ROUTE.MOUNTAIN_SEARCH} animation="none" preLoad>
      <SearchInput placeholder="산 이름을 입력해주세요" />
    </StackLink>
  );
}
