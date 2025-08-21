import TokenProcessingSection from "@pages/social-login-loading/TokenProcessingSection";
import { Suspense } from "react";

export default function SocialLoginLoadingPage() {
  return (
    <Suspense>
      <TokenProcessingSection />
    </Suspense>
  );
}
