import styled from "@emotion/native";
import Spacing from "@shared/layout/Spacing";
import { COLORS } from "@styles/colorPalette";

const NotificationListLoader = () => {
  return (
    <Container>
      <Box />
      <Spacing size={20} />
      <Box />
      <Spacing size={20} />
      <Box />
      <Spacing size={20} />
      <Box />
    </Container>
  );
};

const Container = styled.View`
  padding: 24px;
`;

const Box = styled.View`
  width: 100%;
  height: 32px;
  background-color: ${COLORS.gray300};
  border-radius: 8px;
`;

export default NotificationListLoader;
