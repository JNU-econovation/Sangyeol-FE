import { useProfileModalFormContext } from "@hooks/feature/form/useProfileModalForm";
import Text from "@shared/ui/Text";
import TextAreaField from "@shared/ui/TextareaField";
import { Controller } from "react-hook-form";
import styled from "@emotion/native";

const WeightField = () => {
  const { watch } = useProfileModalFormContext();

  return (
    <Controller
      name="weight"
      render={({ field: { onChange, value } }) => (
        <TextAreaField
          title="몸무게"
          titleSize={16}
          titleSpacing={4}
          titleWeight="semibold"
          titleSideComponent={<Text color="red">*</Text>}
          value={value}
          onChangeText={onChange}
          helperText={
            watch("weightHelperState") === "necessary"
              ? "필수 입력 사항입니다."
              : ""
          }
          helperTextProps={{ color: "error" }}
          keyboardType="numeric"
          contentRightComponent={
            <RightContainer>
              <Text fontWeight="semibold" fontSize={16}>
                kg
              </Text>
            </RightContainer>
          }
        />
      )}
    />
  );
};

const RightContainer = styled.View`
  height: 100%;
  justify-content: center;
  align-items: center;
  padding-right: 14px;
`;

export default WeightField;
