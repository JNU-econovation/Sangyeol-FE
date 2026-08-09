"use client";

import useSendToken from "@shared/hooks/common/useSendToken";
import useSaveAuthToken from "@shared/hooks/domain/authenticate/useSaveAuthToken";
import Flex from "@shared/components/primitives/layout/Flex";
import Spinner from "@shared/components/primitives/ui/Spinner";

export default function TokenProcessingSection() {
  useSaveAuthToken();
  useSendToken();

  return (
    <section className="h-screen">
      <Flex
        flexDirection="flex-row"
        justifyContent="justify-center"
        alignItems="items-center"
        height="full"
      >
        <Spinner size={"md"} />
        <div />
      </Flex>
    </section>
  );
}
