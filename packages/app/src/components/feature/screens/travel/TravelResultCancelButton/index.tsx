import { router } from "expo-router";
import { useCallback, useEffect } from "react";
import styled from "@emotion/native";
import useTravelStateStore from "@store/travel";

const TravelResultCancelButton = () => {
  const { reset } = useTravelStateStore();

  const goBack = useCallback(() => {
    router.dismissAll();
    router.replace("/(tabs)/home");
  }, []);

  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  return (
    <XButton onPress={goBack}>
      <XIcon source={require("@assets/images/Close_Button.png")} />
    </XButton>
  );
};

const XButton = styled.TouchableOpacity`
  align-self: flex-end;
  justify-self: flex-end;
`;

const XIcon = styled.Image`
  width: 25px;
  height: 25px;
`;

export default TravelResultCancelButton;
