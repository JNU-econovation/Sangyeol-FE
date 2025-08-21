import Text from "@components/common/shared/ui/Text";
import styled from "@emotion/native";
import { View } from "react-native";

const HomeCanvas = () => {
  return (
    <Container>
      <View>
        <Text fontSize={20} fontWeight="bold" color="mainGreen">
          하람이가 산좀 타래요
        </Text>
      </View>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
`;

export default HomeCanvas;
