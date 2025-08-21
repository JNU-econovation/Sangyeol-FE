import styled from "@emotion/native";
import DefaultButton from "@shared/ui/buttons/DefaultButton";
import { KakaoSVG } from "@shared/ui/Icons";
import { router } from "expo-router";
import { useCallback } from "react";

const KakaoLoginButton = () => {
  const handleKakaoLogin = useCallback(() => {
    if (process.env.EXPO_PUBLIC_SERVER_MODE === "mock") {
      router.dismissAll();
      router.replace("/(tabs)/home");
      return;
    }
    router.push({
      pathname: "/loginModal",
      params: {
        type: "kakao",
      },
    });
  }, []);

  return (
    <Container>
      <DefaultButton
        title="카카오톡으로 3초만에 시작하기"
        backgroundColor="kakaoYellow"
        color="black"
        fullWidth
        startIcon={<KakaoSVG />}
        onPress={handleKakaoLogin}
      />
    </Container>
  );
};

const Container = styled.View`
  width: 100%;
`;

export default KakaoLoginButton;
