import HELPER from "@constants/inputField/helper";
import styled from "@emotion/native";
import { useProfileSetFormContext } from "@hooks/feature/form/useProfileSetForm";
import useCheckNicknameDuplicatedMutate from "@hooks/feature/query/mutate/useCheckNicknameDuplicatedMutate";
import useRandomNicknameQuery from "@hooks/feature/query/query/useRandomNicknameQuery";
import DefaultButton from "@shared/ui/buttons/DefaultButton";
import TextAreaField from "@shared/ui/TextareaField";
import { COLORS } from "@styles/colorPalette";
import { Suspense } from "@suspensive/react";
import { useEffect } from "react";
import { Controller } from "react-hook-form";
import { Keyboard } from "react-native";
import { z } from "zod";

const nicknameSchema = z
  .string()
  .min(2)
  .max(12)
  .regex(
    /^[가-힣a-zA-Z0-9]{1,12}$/,
    "공백 없이 12자 이내 한글, 영문, 숫자만 입력 가능",
  );

const NicknameField = Suspense.with(
  {
    fallback: <TextAreaField.loader />,
  },
  () => {
    const { control, getValues, setValue, watch } = useProfileSetFormContext();

    const {
      data: { nickname: randomNickname },
    } = useRandomNicknameQuery();
    const { mutate: checkNicknameDuplicated } =
      useCheckNicknameDuplicatedMutate();

    const checkNickname = (nickname: string) => {
      const result = nicknameSchema.safeParse(nickname);

      if (nickname.length === 0) {
        setValue("nicknameFieldHelperState", "NONE");
        return;
      }

      if (result.success) {
        setValue("nicknameFieldHelperState", "FIT");
        return;
      }

      setValue("nicknameFieldHelperState", "INVALID");
    };

    const handleEmailSubmit = () => {
      if (watch("nicknameFieldHelperState") !== "FIT") return;
      Keyboard.dismiss();

      checkNicknameDuplicated(
        { nickname: getValues("nickname") },
        {
          onSuccess: ({ isDuplicated }) => {
            if (isDuplicated) {
              setValue("nicknameFieldHelperState", "DUPLICATED");
              return;
            }

            setValue("nicknameFieldHelperState", "SUCCESS");
            setValue("nickname", getValues("nickname"));
            setValue("isNicknameValid", true);
          },
        },
      );
    };

    useEffect(() => {
      setValue("nickname", randomNickname);
    }, [randomNickname]);

    return (
      <Controller
        name="nickname"
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextAreaField
            title="닉네임"
            titleSpacing={0}
            placeholder={randomNickname}
            backgroundColor="inputGray"
            borderColor="inputGray"
            paddingVertical={16}
            placeholderTextColor={COLORS.subGray}
            helperText={
              HELPER.PROFILE_FORM.NICKNAME[watch("nicknameFieldHelperState")]
            }
            onChangeText={(text) => {
              checkNickname(text);
              setValue("isNicknameValid", false);
              onChange(text);
            }}
            value={value}
            maxLength={12}
            helperTextProps={{
              color:
                watch("nicknameFieldHelperState") === "FIT" ||
                watch("nicknameFieldHelperState") === "SUCCESS"
                  ? "success"
                  : "error",
            }}
            contentRightComponent={
              <InputRightSideContainer>
                <DefaultButton
                  title={"확인"}
                  color="mainWhite"
                  fontSize={14}
                  paddingHorizontal={12}
                  paddingVertical={8}
                  fullWidth
                  onPress={handleEmailSubmit}
                  disabled={watch("nicknameFieldHelperState") !== "FIT"}
                />
              </InputRightSideContainer>
            }
          />
        )}
      />
    );
  },
);

const InputRightSideContainer = styled.View`
  width: 80px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 8px;
`;

export default NicknameField;
