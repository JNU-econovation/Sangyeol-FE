import styled from "@emotion/native";
import Spacing from "@shared/layout/Spacing";
import Text, { TextProps } from "@shared/ui/Text";

interface FieldLayoutProps {
  title: string;
  titleSideComponent?: React.ReactNode;
  titleSize?: number;
  titleWeight?: TextProps["fontWeight"];
  content: React.ReactNode;
  contentLeftComponent?: React.ReactNode;
  contentRightComponent?: React.ReactNode;
}

const FieldLayout = ({
  title,
  titleSideComponent,
  titleSize = 20,
  titleWeight = "medium",
  content,
  contentLeftComponent,
  contentRightComponent,
}: FieldLayoutProps) => {
  return (
    <>
      <HeaderContainer>
        <Text fontWeight={titleWeight} fontSize={titleSize}>
          {title}
        </Text>
        {titleSideComponent && titleSideComponent}
      </HeaderContainer>
      <Spacing size={14} />
      <ContentContainer>
        {content}
        {contentLeftComponent && (
          <ContentLeftComponentContainer>
            {contentLeftComponent}
          </ContentLeftComponentContainer>
        )}
        {contentRightComponent && (
          <ContentRightComponentContainer>
            {contentRightComponent}
          </ContentRightComponentContainer>
        )}
      </ContentContainer>
    </>
  );
};

const HeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

const ContentContainer = styled.View`
  position: relative;
`;

const ContentLeftComponentContainer = styled.View`
  position: absolute;
  height: 100%;
  left: 0;
`;

const ContentRightComponentContainer = styled.View`
  position: absolute;
  height: 100%;
  right: 0;
`;

export default FieldLayout;
