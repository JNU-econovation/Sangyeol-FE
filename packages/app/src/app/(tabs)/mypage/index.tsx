import styled from "@emotion/native";
import MyInfoSection from "@screens/mypage/MyInfoSection";
import MyPageHeader from "@screens/mypage/MyPageHeader";
import MyPageNavListSection from "@screens/mypage/MyPageNavListSection";
import ScreenContainer from "@shared/layout/Screen";
import Spacing from "@shared/layout/Spacing";
import { ScrollView } from "react-native";

const MyPageScreen = () => {
  return (
    <ScreenContainer>
      <MyPageHeader />
      <ScrollContainer>
        <Spacing size={28} />
        <MyInfoSection />
        <MyPageNavListSection />
      </ScrollContainer>
    </ScreenContainer>
  );
};

const ScrollContainer = styled(ScrollView)`
  flex: 1;
`;

export default MyPageScreen;
