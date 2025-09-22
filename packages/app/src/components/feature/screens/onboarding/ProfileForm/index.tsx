import styled from "@emotion/native";
import useProfileSetForm from "@hooks/feature/form/useProfileSetForm";
import Spacing from "@shared/layout/Spacing";
import { FormProvider } from "react-hook-form";
import { KeyboardAvoidingView, Platform } from "react-native";

// form field
import EmailField from "./EmailField";
import NicknameField from "./NicknameField";
import PhoneNumberField from "./PhoneNumberField";
import SubmitButton from "./SubmitButton";
import VerificationField from "./VerificationField";

const ProfileForm = () => {
  const form = useProfileSetForm();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
    >
      <FormProvider {...form}>
        <FormContainer>
          <NicknameField />
          <Spacing size={14} />
          <PhoneNumberField />
          <Spacing size={14} />
          <VerificationField />
          <Spacing size={14} />
          <EmailField />
          <Spacing size={60} />
          <SubmitButton />
        </FormContainer>
      </FormProvider>
    </KeyboardAvoidingView>
  );
};

const FormContainer = styled.ScrollView`
  padding-inline: 24px;
  flex: 1;
`;

export default ProfileForm;
