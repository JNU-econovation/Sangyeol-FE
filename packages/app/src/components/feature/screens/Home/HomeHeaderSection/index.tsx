import { BellSVG, SettingSVG } from "@components/common/shared/ui/Icons";
import Hero from "@components/feature/widget/Hero";
import styled from "@emotion/native";

const HomeHeaderSection = () => {
  return (
    <Container>
      <Hero />

      <IconContainer>
        <BellSVG scale={10} />
        <SettingSVG />
      </IconContainer>
    </Container>
  );
};

const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const IconContainer = styled.View`
  flex-direction: row;
  gap: 16px;
  align-items: center;
`;

export default HomeHeaderSection;
