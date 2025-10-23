import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const useSaveAuthToken = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const accessToken = searchParams.get("accessToken");
  const refreshToken = searchParams.get("refreshToken");
  const expiredTime = searchParams.get("expiredTime");

  useEffect(() => {
    if (accessToken && refreshToken) {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("expiredTime", expiredTime);
    }
  }, [accessToken, refreshToken, router]);
};

export default useSaveAuthToken;
