import Spacing from "@components/common/shared/layout/Spacing";
import Text from "@components/common/shared/ui/Text";
import styled from "@emotion/native";
import TextAreaField from "@shared/ui/TextareaField";
import { COLORS } from "@styles/colorPalette";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";

import { useProfileModalForm } from "@hooks/feature/form/useProfileModalForm";
import { FormProvider } from "react-hook-form";
import BloodTypeField from "./BloodTypeField";
import HeightField from "./HeightField";
import NameField from "./NameField";
import SubmitButton from "./SubmitButton";
import WeightField from "./WeightField";
import useProfileQuery from "@hooks/feature/query/query/useProfileQuery";
import { Suspense } from "@suspensive/react";

interface HomeProfileModalFormProps {
  closeModal: () => void;
}

//TODO: section 컴포넌트가 props를 받아서 사용중임. 이는 컨벤션 위반
const HomeProfileModalForm = Suspense.with(
  {
    fallback: null,
  },
  ({ closeModal }: HomeProfileModalFormProps) => {
    const {
      data: { phoneNumber },
    } = useProfileQuery();
    const form = useProfileModalForm();

    return (
      <OutsideContainer activeOpacity={1}>
        <ModalContainer>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
          >
            <ScrollView>
              <FormProvider {...form}>
                <Text color="primary" fontWeight="bold" fontSize={24}>
                  위급 시 개인 정보
                </Text>
                <Spacing size={18} />
                <NameField />
                <Spacing size={18} />
                <TextAreaField
                  title="전화번호"
                  titleSize={16}
                  titleSpacing={4}
                  titleWeight="semibold"
                  value={phoneNumber}
                  editable={false}
                  color="gray900"
                />
                <Spacing size={18} />
                <HeightField />
                <Spacing size={18} />
                <WeightField />
                <Spacing size={18} />
                <BloodTypeField />
                <Spacing size={18} />
                <ButtonContainer>
                  <SubmitButton closeModal={closeModal} />
                </ButtonContainer>
              </FormProvider>
            </ScrollView>
          </KeyboardAvoidingView>
        </ModalContainer>
      </OutsideContainer>
    );
  },
);

const OutsideContainer = styled.TouchableOpacity`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.View`
  text-align: center;
  width: 320px;
  /* max-height: 80%; */
  padding: 20px;
  background-color: ${COLORS.mainWhite};
  border-radius: 12px;
`;

const ButtonContainer = styled.View`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  width: 100%;
  justify-content: flex-end;
  align-items: center;
`;

export default HomeProfileModalForm;
