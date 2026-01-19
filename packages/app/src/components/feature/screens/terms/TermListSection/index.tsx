import styled from "@emotion/native";
import TermListItemCard from "@screens/terms/TermListItemCard";
import Spacing from "@shared/layout/Spacing";
import Text from "@shared/ui/Text";
import { COLORS } from "@styles/colorPalette";
import { useState } from "react";
import TermSubmitButton from "../TermSubmitButton";

const TermListSection = () => {
  const [require1, setRequire1] = useState(false);
  const [require2, setRequire2] = useState(false);
  const [require3, setRequire3] = useState(false);
  const [optional, setOptional] = useState(false);

  return (
    <>
      <Container>
        <TermListItemCard
          title="전체 동의"
          content={
            <>
              <Spacing size={18} />
              <Text fontSize={12} fontWeight="normal" color="gray900">
                전체동의는 필수 및 선택정보에 대한 동의도
              </Text>
              <Text fontSize={12} fontWeight="normal" color="gray900">
                포함되어 있으며 개별적으로도 동의를 선택할 수 있습니다.
              </Text>
            </>
          }
          checked={require1 && require2 && require3 && optional}
          onPress={() => {
            const newValue = !(require1 && require2 && require3 && optional);
            setRequire1(newValue);
            setRequire2(newValue);
            setRequire3(newValue);
            setOptional(newValue);
          }}
        />
      </Container>
      <Spacing size={12} />
      <Divider />
      <Spacing size={12} />
      <Container>
        <TermListItemCard
          title="[필수] 이용약관 동의"
          checked={require1}
          termLink="https://azure-fahrenheit-0af.notion.site/2025-12-30-2d9ec90d98fc808392e3fe653e745dfa?source=copy_link"
          onPress={() => setRequire1(!require1)}
        />
        <TermListItemCard
          title="[필수] 개인정보 및 민감정보 수집·이용 동의"
          checked={require2}
          termLink="https://azure-fahrenheit-0af.notion.site/2025-12-30-2deec90d98fc80ee8c4cdcfc9cfeb23e?source=copy_link"
          onPress={() => setRequire2(!require2)}
        />
        <TermListItemCard
          title="[필수] 위치정보 수집·이용 동의"
          checked={require3}
          termLink="https://azure-fahrenheit-0af.notion.site/2025-12-30-2deec90d98fc80a9acebe435e32b505a?source=copy_link"
          onPress={() => setRequire3(!require3)}
        />
        <TermListItemCard
          title="[선택] 광고성 정보 및 마케팅 활용 동의"
          checked={optional}
          termLink="https://azure-fahrenheit-0af.notion.site/2deec90d98fc8013be97cec37885a786?source=copy_link"
          onPress={() => setOptional(!optional)}
        />
      </Container>
      <TermSubmitButton disabled={!(require1 && require2 && require3)} />
    </>
  );
};

const Container = styled.View`
  padding-inline: 24px;
  gap: 24px;
`;

const Divider = styled.View`
  height: 6px;
  background-color: ${COLORS.gray500};
`;
export default TermListSection;
