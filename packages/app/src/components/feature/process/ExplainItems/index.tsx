import styled from "@emotion/native";
import Guide1Image from "@shared/ui/Images/Guide1";
import Guide2Image from "@shared/ui/Images/Guide2";
import Guide3Image from "@shared/ui/Images/Guide3";
import Text from "@shared/ui/Text";
import { View, Image } from "react-native";

const SCREEN_HEIGHT = 430;

const ExplainItem1 = () => {
  return (
    <ScreenView>
      <Container>
        <Text fontSize={30} fontWeight="bold" color="mainGreen">
          안전한 모험의 시작
        </Text>
        <Guide1Image />
        <View>
          <Text
            fontSize={20}
            fontWeight="semibold"
            opacity={0.6}
            textAlign="center"
          >
            실시간 코스 안내와 실시간 정보로
          </Text>
          <Text
            fontSize={20}
            fontWeight="semibold"
            opacity={0.6}
            textAlign="center"
          >
            완벽한 산행 준비
          </Text>
        </View>
      </Container>
    </ScreenView>
  );
};

const ExplainItem2 = () => {
  return (
    <ScreenView>
      <Container>
        <Text fontSize={30} fontWeight="bold" color="mainGreen">
          안전을 위한 스마트 가이드
        </Text>
        <Guide2Image />
        <View>
          <Text
            fontSize={20}
            fontWeight="semibold"
            opacity={0.6}
            textAlign="center"
          >
            경로 이탈, 사고 다발 구역
          </Text>
          <Text
            fontSize={20}
            fontWeight="semibold"
            opacity={0.6}
            textAlign="center"
          >
            음성 안내 지원
          </Text>
        </View>
      </Container>
    </ScreenView>
  );
};
const ExplainItem3 = () => {
  return (
    <ScreenView>
      <Container>
        <Text fontSize={30} fontWeight="bold" color="mainGreen">
          나만의 멸종위기 동물 키우기
        </Text>
        <Guide3Image />
        <View>
          <Text
            fontSize={20}
            fontWeight="semibold"
            opacity={0.6}
            textAlign="center"
          >
            산행하면서 획득한 먹이로
          </Text>
          <Text
            fontSize={20}
            fontWeight="semibold"
            opacity={0.6}
            textAlign="center"
          >
            나만의 동물을 키워보세요
          </Text>
        </View>
      </Container>
    </ScreenView>
  );
};
const ExplainItem4 = () => {
  return (
    <ScreenView>
      <Container>
        <Text fontSize={30} fontWeight="bold" color="mainGreen">
          깃대종 식물 키우기
        </Text>
        {/* <Guide3Image /> */}
        <Image
          source={require("@/assets/images/guide3.png")}
          style={{ width: 197, height: 197 }}
        />
        <View>
          <Text
            fontSize={20}
            fontWeight="semibold"
            opacity={0.6}
            textAlign="center"
          >
            전국의 산을 투어하며
          </Text>
          <Text
            fontSize={20}
            fontWeight="semibold"
            opacity={0.6}
            textAlign="center"
          >
            깃대종 식물 획득하기
          </Text>
        </View>
      </Container>
    </ScreenView>
  );
};

const ScreenView = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Container = styled.View`
  display: flex;
  align-items: center;
  gap: 48;
  height: ${SCREEN_HEIGHT};
`;

const ExplainItems = {
  Views: [ExplainItem1, ExplainItem2, ExplainItem4],
  SCREEN_HEIGHT: SCREEN_HEIGHT,
};

export default ExplainItems;
