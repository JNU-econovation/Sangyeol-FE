import PositionBottom from "@shared/layout/PositionBottom";
import DefaultButton from "@shared/ui/buttons/DefaultButton";
import { router } from "expo-router";

import { Image } from "react-native";

const LoginButton = () => {
  return (
    <PositionBottom paddingInline={20} bottom={50}>
      <Image
        source={require("@assets/images/buttonRoute.png")}
        style={{
          width: 65,
          height: 65,
          alignSelf: "flex-end",
        }}
      />
      <DefaultButton
        title="로그인 하러 가기"
        fullWidth
        color="mainWhite"
        onPress={() => {
          router.push("/login");
        }}
      />
    </PositionBottom>
  );
};

LoginButton.OCCUPY_SPACE = PositionBottom.DEFAULT_BOTTOM_SPACE + 100;

export default LoginButton;
