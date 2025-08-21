import styled from "@emotion/native";
import BackButton from "@entities/BackButton";
import Text from "@shared/ui/Text";

const DEFAULT_PADDING_INLINE = 28;

interface HeaderProps {
  paddingInline?: number;
  paddingBlock?: number;
  headerRight?: React.ReactNode;
  headerLeft?: React.ReactNode;
  headerTitle?: string;
}

const Header = ({
  paddingBlock,
  paddingInline,
  headerTitle,
  headerLeft,
  headerRight,
}: HeaderProps) => {
  return (
    <Container paddingBlock={paddingBlock} paddingInline={paddingInline}>
      <HeaderItem>{headerLeft || <BackButton />}</HeaderItem>
      <HeaderItem>
        <Text textAlign="center" fontSize={18} fontWeight="semibold">
          {headerTitle}
        </Text>
      </HeaderItem>
      <HeaderItem>{headerRight && headerRight}</HeaderItem>
    </Container>
  );
};

const Container = styled.View<HeaderProps>`
  padding-inline: ${({ paddingInline }) =>
    paddingInline ? `${paddingInline}px` : `${DEFAULT_PADDING_INLINE}px`};
  padding-block: ${({ paddingBlock }) =>
    paddingBlock ? `${paddingBlock}px` : "0"};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const HeaderItem = styled.View`
  flex: 1;
`;

export default Header;
