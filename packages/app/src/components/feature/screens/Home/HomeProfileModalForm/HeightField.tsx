import styled from "@emotion/native";
import { useProfileModalFormContext } from "@hooks/feature/form/useProfileModalForm";
import Text from "@shared/ui/Text";
import TextAreaField from "@shared/ui/TextareaField";
import { Controller } from "react-hook-form";

const HeightField = () => {
  const { watch } = useProfileModalFormContext();

  return (
    <Controller
      name="height"
      render={({ field: { onChange, value } }) => (
        <TextAreaField
          title="키"
          titleSize={16}
          titleSpacing={4}
          titleWeight="semibold"
          value={value}
          onChangeText={onChange}
          helperText={
            watch("heightHelperState") === "necessary"
              ? "필수 입력 사항입니다."
              : ""
          }
          helperTextProps={{ color: "error" }}
          keyboardType="numeric"
          contentRightComponent={
            <RightContainer>
              <Text fontWeight="semibold" fontSize={16}>
                cm
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

export default HeightField;
