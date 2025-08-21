import { COLORS } from "@styles/colorPalette";
import Text from "@components/common/shared/ui/Text";
import styled from "@emotion/native";
import { SafeAreaView } from "react-native-safe-area-context";

interface HeroProps {
  textColor?: keyof typeof COLORS;
}

const Hero = ({ textColor }: HeroProps) => {
  // TODO: 서버에서 가져오는 로직으로 변경
  const userProfile = "";
  const userName = "name";

  return (
    <Container>
      <HeroImage userProfileUrl={userProfile} />
      <Text color={textColor} fontSize={18} fontWeight="bold">
        {userName}님
      </Text>
    </Container>
  );
};

const Container = styled.View`
  flex-direction: row;
  gap: 8px;
  align-items: center;
`;

const HeroImage = styled.View<{ userProfileUrl: string }>`
  width: 40px;
  height: 40px;
  border-radius: 100%;
  background-color: ${COLORS.mainWhite};
  background-image: url(${(props) => props.userProfileUrl});
  background-size: cover;
  background-position: center;
`;

export default Hero;
