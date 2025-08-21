import styled from "@emotion/native";
import useScreenDisable from "@hooks/common/useScreenDisable";
import useAppleLoginMutate from "@hooks/feature/query/mutate/useAppleLoginMutate";
import DefaultButton from "@shared/ui/buttons/DefaultButton";
import { AppleSVG } from "@shared/ui/Icons";
import { useTokenStore } from "@store/secureStorage/useTokenStore";
import { setValueToSecureStore } from "@utils/secureStore";
import * as AppleAuthentication from "expo-apple-authentication";
import { router } from "expo-router";
import { useCallback } from "react";

const AppleLoginButton = () => {
  const { setScreenDisable, resetScreenDisable } = useScreenDisable();
  const { setAccessToken, setRefreshToken, setAccessTokenExpiredTime } =
    useTokenStore();
  const { mutate } = useAppleLoginMutate();

  const login = useCallback(async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      if (!credential.identityToken || !credential.authorizationCode) {
        throw new Error("Invalid credential");
      }

      const { identityToken, email, fullName } = credential;

      mutate(
        {
          identityToken,
          email: email || "",
          fullName: {
            familyName: fullName?.familyName || "",
            givenName: fullName?.givenName || "",
          },
        },
        {
          onSuccess: ({ accessToken, refreshToken, expirationTime }: any) => {
            setAccessToken(accessToken);
            setRefreshToken(refreshToken);
            setAccessTokenExpiredTime(expirationTime);

            setValueToSecureStore("accessToken", accessToken);
            setValueToSecureStore("refreshToken", refreshToken);
            setValueToSecureStore("expirationTime", `${expirationTime}`);

            resetScreenDisable();
            router.dismissAll();
            router.replace("/(tabs)/home");
          },
          onError: (error) => {
            // console.error("애플 로그인 요청 에러", error);
            resetScreenDisable();
          },
          onSettled: () => {
            setScreenDisable();
          },
        },
      );
    } catch (e) {
      if (e.code === "ERR_REQUEST_CANCELED") {
        // console.error("애플 로그인 요청이 취소되었습니다.");
      } else {
        // handle other errors
      }
    }
  }, []);

  return (
    <Container>
      <DefaultButton
        title="apple로 계속하기"
        backgroundColor="black"
        color="mainWhite"
        startIcon={<AppleSVG />}
        fullWidth
        onPress={login}
      />
    </Container>
  );
};

const Container = styled.View`
  width: 100%;
`;

export default AppleLoginButton;
