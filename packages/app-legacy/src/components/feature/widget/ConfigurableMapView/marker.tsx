import styled from "@emotion/native";
import { NaverMapMarkerOverlay } from "@mj-studio/react-native-naver-map";
import Text from "@shared/ui/Text";
import { COLORS } from "@styles/colorPalette";
import { memo } from "react";

export interface NaverMapMarkerProps {
  latitude: number;
  longitude: number;
  text: string;
  isHidden?: boolean;
}

const NaverMapMarker = memo(
  ({ text, latitude, longitude, isHidden = false }: NaverMapMarkerProps) => {
    return (
      <NaverMapMarkerOverlay
        latitude={latitude}
        longitude={longitude}
        isHidden={isHidden}
      >
        {/* 해당 요소는 글자 배경을 위하여 사용됩니다. 이는 children으로 받은 Text가 보이지 않아 편법으로 만든 요소입니다. */}
        <Container collapsable={false}>
          <TextContainer
            text={text}
            style={{
              transform: [{ translateX: (text.length / 2) * 10 + 28 }],
            }}
          >
            <FakeContainer collapsable={false}>
              <Text fontSize={12}>{text}</Text>
            </FakeContainer>
            <Text
              color="primary"
              fontSize={12}
              fontWeight="semibold"
              style={{
                position: "absolute",
                top: "26%",
                bottom: 0,
                textAlign: "center",
                width: "100%",
                textAlignVertical: "center",
              }}
            >
              {text}
            </Text>
          </TextContainer>
        </Container>
      </NaverMapMarkerOverlay>
    );
  },
);

const Container = styled.View`
  justify-content: center;
  align-items: center;
  position: relative;
  flex-direction: row;
`;

const TextContainer = styled.View<{ text: string }>`
  position: absolute;
  height: 100%;
  width: auto;
`;

const FakeContainer = styled.View`
  margin-top: 3px;
  padding-block: 4px;
  padding-inline: 12px;
  background-color: ${COLORS.mainWhite};
  border-radius: 30px;
  border-width: 1px;
  border-color: ${COLORS.primary};
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export default NaverMapMarker;
