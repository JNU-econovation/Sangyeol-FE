import Text from "@components/common/shared/ui/Text";
import styled from "@emotion/native";
import Spacing from "@shared/layout/Spacing";
import { COLORS } from "@styles/colorPalette";

const MyInfoSectionLoader = () => {
  return (
    <Container>
      {/* Content */}
      <ContentContainer>
        {/* Profile Image */}
        <SkeletonCircle />
        <Spacing size={20} />

        {/* Profile Change Link */}
        <SkeletonText width={80} height={16} />
        <Spacing size={20} />

        {/* User Name */}
        <SkeletonText width={128} height={22} />
        <Spacing size={16} />

        {/* Navigation Links */}
        <NavigationContainer>
          <Text fontSize={16} fontWeight="semibold" color="primary">
            산행 기록
          </Text>

          <NavigationDivider />

          <Text fontSize={16} fontWeight="semibold" color="primary">
            코스 북마크
          </Text>
        </NavigationContainer>
      </ContentContainer>
    </Container>
  );
};

const Container = styled.View`
  background-color: ${COLORS.mainWhite};
`;

const ContentContainer = styled.View`
  align-items: center;
  padding: 0 16px;
`;

const SkeletonText = styled.View<{
  width: number;
  height?: number;
}>`
  height: ${({ height }) => (height ? height : 16)}px;
  width: ${({ width }) => width}px;
  background-color: ${COLORS.gray300};
  border-radius: 4px;
`;

const SkeletonCircle = styled.View`
  width: 96px;
  height: 96px;
  border-radius: 48px;
  background-color: ${COLORS.gray300};
`;

const NavigationContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 40px;
`;

const NavigationDivider = styled.View`
  width: 1px;
  height: 24px;
  background-color: ${COLORS.gray300};
`;

export default MyInfoSectionLoader;
