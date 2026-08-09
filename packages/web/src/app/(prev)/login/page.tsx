import ROUTE from "@shared/constants/route";
import KakaoLoginSection from "@modules/widgets/login/KakaoLoginSection";
import { redirect } from "next/navigation";

const isMockServer = process.env.NEXT_PUBLIC_NODE_ENV === "development";

export default function KakaoLoginPage() {
  if (isMockServer)
    redirect(
      ROUTE.SOCIAL_LOGIN_LOADING +
        "?accessToken=test&refreshToken=test&expiredTime=1769502190632",
    );
  return <>{!isMockServer && <KakaoLoginSection />}</>;
}
