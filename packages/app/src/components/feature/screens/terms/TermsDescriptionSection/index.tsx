import styled from "@emotion/native";
import Text from "@shared/ui/Text";

const TermsDescriptionSection = () => {
  return (
    <Container>
      <Text fontWeight="semibold" fontSize={30} color="primary">
        환영합니다!
      </Text>
      <Text fontWeight="semibold" fontSize={30} color="primary">
        아래 약관에 동의하시면
      </Text>
      <Text fontWeight="semibold" fontSize={30} color="primary">
        안전한 산행이 시작됩니다
      </Text>
    </Container>
  );
};

const Container = styled.View`
  padding-inline: 24px;
`;

export default TermsDescriptionSection;
