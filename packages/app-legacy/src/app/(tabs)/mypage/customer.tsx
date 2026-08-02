import styled from "@emotion/native";
import ScreenContainer from "@shared/layout/Screen";
import Spacing from "@shared/layout/Spacing";
import Header from "@shared/ui/Header";
import { ChevronLeft } from "@shared/ui/Icons";
import Text from "@shared/ui/Text";
import { COLORS } from "@styles/colorPalette";
import { Linking } from "react-native";

const CustomerScreen = () => {
  const openKakaoChannel = async () => {
    const channelId = process.env.EXPO_PUBLIC_KAKAO_CHANNEL_ID;
    const channelUrl = `kakaoplus://plusfriend/home/${channelId}`;
    const fallbackUrl = `https://pf.kakao.com/${channelId}`;

    try {
      const supported = await Linking.canOpenURL(channelUrl);
      if (supported) {
        await Linking.openURL(channelUrl);
      } else {
        await Linking.openURL(fallbackUrl);
      }
    } catch (error) {
      console.error("Error:", error);
      await Linking.openURL(fallbackUrl);
    }
  };

  return (
    <ScreenContainer>
      <Header headerTitle="문의하기" />
      <Spacing size={20} />
      <UnorderedListContainer>
        <ListItem>
          <Text fontSize={16} fontWeight="medium" color="black">
            메일
          </Text>
          <Text fontSize={16} fontWeight="light" color="black">
            sangyeolofficial@gmail.com
          </Text>
        </ListItem>
        <ListItem onPress={openKakaoChannel}>
          <Text fontSize={16} fontWeight="medium" color="black">
            카카오톡
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

export default CustomerScreen;
