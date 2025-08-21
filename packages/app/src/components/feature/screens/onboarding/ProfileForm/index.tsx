import styled from "@emotion/native";
import useProfileSetForm from "@hooks/feature/form/useProfileSetForm";
import Spacing from "@shared/layout/Spacing";
import { FormProvider } from "react-hook-form";

// form field
import EmailField from "./EmailField";
import NicknameField from "./NicknameField";
import PhoneNumberField from "./PhoneNumberField";
import VerificationField from "./VerificationField";
import SubmitButton from "./SubmitButton";

const ProfileForm = () => {
  const form = useProfileSetForm();

  return (
    <FormProvider {...form}>
      <FormContainer>
        <NicknameField />
        <Spacing size={14} />
        <PhoneNumberField />
        <Spacing size={14} />
        <VerificationField />
        <Spacing size={14} />
        <EmailField />
      </FormContainer>
      <SubmitButton />
    </FormProvider>
  );
};

const FormContainer = styled.View`
  padding-inline: 24px;
`;

export default ProfileForm;
