import HELPER from "@constants/inputField/helper";
import styled from "@emotion/native";
import { useProfileSetFormContext } from "@hooks/feature/form/useProfileSetForm";
import useVerifyPhoneNumber from "@hooks/feature/query/mutate/useVerifyPhoneNumber";
import DefaultButton from "@shared/ui/buttons/DefaultButton";
import Text from "@shared/ui/Text";
import TextAreaField from "@shared/ui/TextareaField";
import { timestampToMinutesSeconds } from "@utils/time";
import { useEffect, useRef, useState } from "react";
import { Controller } from "react-hook-form";
import { Keyboard } from "react-native";

const VerificationField = () => {
  const { control, getValues, watch, setValue } = useProfileSetFormContext();
  const [verificationTimer, setVerificationTimer] = useState<number | null>(
    null,
  );
  const timerRef = useRef<number | null>(null);

  const { mutate: checkVerificationCode } = useVerifyPhoneNumber();

  const handlePhoneNumberVerification = () => {
    const verificationCode = getValues("verificationCode");
    if (verificationCode.length === 6) {
      Keyboard.dismiss();
      if (getValues("verificationFieldHelperState") !== "NONE") return;

      checkVerificationCode(
        { certificationCode: verificationCode },
        {
          onSuccess: () => {
            setValue("verificationFieldHelperState", "SUCCESS");
            setValue("isPhoneNumberValid", true);
            return;
          },
          onError: (error) => {
            setValue("verificationFieldHelperState", "ERROR");
            setValue("isPhoneNumberValid", false);
          },
        },
      );
    }
  };

  useEffect(() => {
    if (watch("verificationDeadline")) {
      timerRef.current = setInterval(() => {
        const remainingTime = watch("verificationDeadline") - Date.now();
        if (remainingTime <= 0) {
          setVerificationTimer(null);
          setValue("verificationFieldHelperState", "TIMEOUT");
        } else {
          setVerificationTimer(remainingTime);
        }
      }, 100);
    }

    if (watch("isPhoneNumberValid") && timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [watch("verificationDeadline"), watch("isPhoneNumberValid")]);

  return (
    <Controller
      name="verificationCode"
      control={control}
      render={({ field: { onChange, value } }) => (
        <TextAreaField
          title="인증번호"
          titleSpacing={0}
          backgroundColor="inputGray"
          borderColor="inputGray"
          paddingVertical={16}
          helperText={
            HELPER.PROFILE_FORM.VERIFICATION[
              getValues("verificationFieldHelperState")
            ]
          }
          onChangeText={(verificationCode) => {
            if (watch("isPhoneNumberValid")) {
              return;
            }
            setValue("verificationFieldHelperState", "NONE");
            onChange(verificationCode);
            if (verificationCode.length === 6) {
              Keyboard.dismiss();
            }
          }}
          editable={
            !watch("isPhoneNumberValid") &&
            watch("phoneNumberVerificationCount") > 0
          }
          keyboardType="number-pad"
          value={`${value}`}
          maxLength={6}
          titleSideComponent={
            <Text>
              {verificationTimer !== null
                ? timestampToMinutesSeconds(verificationTimer)
                : ""}
            </Text>
          }
          helperTextProps={{
            color:
              watch("verificationFieldHelperState") === "SUCCESS"
                ? "success"
                : "error",
          }}
          contentRightComponent={
            <InputRightSideContainer>
              <DefaultButton
                title="확인"
                color="mainWhite"
                fontSize={14}
                paddingHorizontal={12}
                paddingVertical={8}
                onPress={handlePhoneNumberVerification}
                disabled={
                  watch("phoneNumberVerificationCount") === 0 ||
                  watch("verificationCode").length !== 6 ||
                  watch("verificationFieldHelperState") !== "NONE"
                }
              />
            </InputRightSideContainer>
          }
        />
      )}
    />
  );
};

const InputRightSideContainer = styled.View`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 8px;
`;

export default VerificationField;
