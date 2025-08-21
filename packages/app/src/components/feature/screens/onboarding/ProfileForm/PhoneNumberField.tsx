import HELPER from "@constants/inputField/helper";
import styled from "@emotion/native";
import { useProfileSetFormContext } from "@hooks/feature/form/useProfileSetForm";
import useSMSForVerificationMutate from "@hooks/feature/query/mutate/useSMSForVerificationMutate";
import DefaultButton from "@shared/ui/buttons/DefaultButton";
import Text from "@shared/ui/Text";
import TextAreaField from "@shared/ui/TextareaField";
import { COLORS } from "@styles/colorPalette";
import {
  isValidPhoneNumber,
  isValidPhoneWithoutPrefix,
  validateAndFormatPhoneWithoutPrefix,
} from "@utils/phoneNumber";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { Keyboard } from "react-native";

const PhoneNumberField = () => {
  const { control, getValues, watch, setValue } = useProfileSetFormContext();
  const { mutate: sendSMSVerification } = useSMSForVerificationMutate();

  const [isFocused, setIsFocused] = useState(false);

  const handlePhoneNumberVerification = () => {
    const phoneNumber = `010-${getValues("phoneNumber")}`;
    Keyboard.dismiss();
    if (isValidPhoneNumber(phoneNumber)) {
      sendSMSVerification(phoneNumber, {
        onSuccess: () => {
          setValue("verificationDeadline", Date.now() + 1000 * 60 * 5); //5 min
          setValue(
            "phoneNumberVerificationCount",
            watch("phoneNumberVerificationCount") + 1,
          );
        },
      });
    }
  };

  return (
    <Controller
      name="phoneNumber"
      control={control}
      render={({ field: { onChange, value } }) => (
        <TextAreaField
          title="전화번호"
          titleSpacing={0}
          backgroundColor="inputGray"
          borderColor="inputGray"
          paddingVertical={16}
          placeholderTextColor={COLORS.subGray}
          helperText={
            HELPER.PROFILE_FORM.PHONE_NUMBER[
              watch("phoneNumberFieldHelperState")
            ]
          }
          paddingHorizontal={55}
          onChangeText={(phoneNumber) => {
            if (watch("isPhoneNumberValid")) {
              return;
            }
            const formatted = validateAndFormatPhoneWithoutPrefix(phoneNumber);
            onChange(formatted);
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          keyboardType="number-pad"
          value={value}
          maxLength={9}
          editable={!watch("isPhoneNumberValid")}
          helperTextProps={{
            color:
              watch("phoneNumberFieldHelperState") === "SUCCESS"
                ? "success"
                : "error",
          }}
          contentLeftComponent={
            <InputLeftSideContainer>
              <Text
                color={
                  watch("phoneNumber").length === 0 && !isFocused
                    ? "gray20"
                    : "black"
                }
              >
                010 -
              </Text>
            </InputLeftSideContainer>
          }
          contentRightComponent={
            <InputRightSideContainer>
              <DefaultButton
                title={
                  watch("phoneNumberVerificationCount") === 0
                    ? "인증요청"
                    : "재전송"
                }
                color="mainWhite"
                fontSize={14}
                paddingHorizontal={12}
                paddingVertical={8}
                onPress={handlePhoneNumberVerification}
                disabled={
                  isValidPhoneWithoutPrefix(value) === false ||
                  watch("isPhoneNumberValid")
                }
              />
            </InputRightSideContainer>
          }
        />
      )}
    />
  );
};

const InputLeftSideContainer = styled.View`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 14px;
`;

const InputRightSideContainer = styled.View`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 8px;
`;

export default PhoneNumberField;
