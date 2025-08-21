"use client";

import useSendToken from "@hooks/common/useSendToken";
import useSaveAuthToken from "@hooks/feature/authenticate/useSaveAuthToken";
import Flex from "@shared/layout/Flex";
import Spinner from "@shared/ui/Spinner";

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
