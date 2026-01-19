import TERM_URL from "@constants/term";
import styled from "@emotion/native";
import ScreenContainer from "@shared/layout/Screen";
import Spacing from "@shared/layout/Spacing";
import Header from "@shared/ui/Header";
import { ChevronLeft } from "@shared/ui/Icons";
import Text from "@shared/ui/Text";
import { COLORS } from "@styles/colorPalette";
import { router } from "expo-router";

const CheckTermsScreen = () => {
  const onPressItem = (termType: keyof typeof TERM_URL) => {
    router.push({
      pathname: "/webModal/[uri]",
      params: {
        uri: TERM_URL[termType],
      },
    });
  };

  return (
    <ScreenContainer>
      <Header headerTitle="약관 확인" />
      <Spacing size={20} />
      <UnorderedListContainer>
        <ListItem onPress={() => onPressItem("NECESSARY")}>
          <Text fontSize={16} fontWeight="medium" color="black">
            서비스 이용약관
          </Text>
          <ChevronLeft />
        </ListItem>
        <ListItem onPress={() => onPressItem("PRIVACY")}>
          <Text fontSize={16} fontWeight="medium" color="black">
            개인정보 처리방침
          </Text>
          <ChevronLeft />
        </ListItem>
        <ListItem onPress={() => onPressItem("LOCATION")}>
          <Text fontSize={16} fontWeight="medium" color="black">
            위치기반 서비스 이용약관
          </Text>
          <ChevronLeft />
        </ListItem>
      </UnorderedListContainer>
    </ScreenContainer>
  );
};

const UnorderedListContainer = styled.View`
  padding-inline: 30px;
`;

const ListItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom-width: 1px;
  border-color: ${COLORS.green600};
  padding-block: 15px;
`;

export default CheckTermsScreen;
