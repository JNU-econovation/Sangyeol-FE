import styled from "@emotion/native";
import { useDetailReportFormContext } from "@hooks/feature/form/useDetailReportForm";
import useModal from "@service/modal/hooks";
import Spacing from "@shared/layout/Spacing";
import DefaultButton from "@shared/ui/buttons/DefaultButton";
import Text from "@shared/ui/Text";
import { COLORS } from "@styles/colorPalette";
import Checkbox from "expo-checkbox";
import { useState } from "react";

export const FREQUENT_REPORT_OPTIONS = [
  "발을 헛디뎠어요.",
  "길을 잃었어요.",
  "기운이 빠졌어요.",
  "높은 곳에서 떨어졌어요.",
  "몸에 경련이 발생했어요.",
  "동물·뱀에 물렸어요.",
  "일행을 찾고 있어요.",
  "임산물 채취로 문제가 발생했어요.",
  "돌·빙설이 떨어졌어요.",
  "더위로 쓰러졌어요.",
  "추위로 쓰러졌어요.",
] as const;

const useFrequentReportModal = () => {
  const { openModal, closeModal } = useModal();
  const { setValue, watch } = useDetailReportFormContext();

  const showReportResult = () => {
    openModal(
      <ModalComponent
        closeModal={() => {
          closeModal();
        }}
        setValue={setValue}
        watch={watch}
      />,
      {
        transparent: true,
        animationType: "none",
        hardwareAccelerated: true,
      },
    );
  };

  return { showReportResult };
};

// Modal Component
const ModalComponent = ({
  closeModal,
  setValue,
  watch,
}: {
  closeModal: () => void;
  setValue: any;
  watch: any;
}) => {
  const [selectedOptions, setSelectedOptions] = useState<
    (typeof FREQUENT_REPORT_OPTIONS)[number][]
  >([]);

  const checkIsOptionSelected = (
    option: (typeof FREQUENT_REPORT_OPTIONS)[number],
  ) => {
    return selectedOptions.includes(option);
  };

  const handleCheckBoxChange = (
    option: (typeof FREQUENT_REPORT_OPTIONS)[number],
  ) => {
    setSelectedOptions((prev) =>
      prev.includes(option)
        ? prev.filter((opt) => opt !== option)
        : [...prev, option],
    );
  };

  const applySelectedOptions = () => {
    if (selectedOptions.length === 0) return;
    const currentContent = watch("reportContent") || "";
    const selectedText = selectedOptions.join(", ");
    const newContent = currentContent
      ? `${currentContent} ${selectedText}`
      : selectedText;
    setValue("reportContent", newContent);
  };

  return (
    <OutsideContainer
      activeOpacity={1}
      onPress={(e) => {
        if (e.target !== e.currentTarget) return;
        closeModal();
      }}
    >
      <ModalContainer>
        <TitleContainer>
          <Text fontSize={20} fontWeight="bold">
            자주하는 신고
          </Text>
          <CloseButtonContainer onPress={closeModal}>
            <CloseButton source={require("@assets/images/Close_Button.png")} />
          </CloseButtonContainer>
        </TitleContainer>
        <ContentContainer>
          <Spacing size={10} />
          <Text fontSize={14} color="gray900">
            ※ 아래에서 원하시는 문구를 선택해주세요.
          </Text>
          <Spacing size={12} />
          <ReportList>
            {FREQUENT_REPORT_OPTIONS.map((option, index) => (
              <ReportListItemContainer
                key={`${index}-${checkIsOptionSelected(option)}`}
              >
                <ReportListItem
                  activeOpacity={0.8}
                  onPress={(e) => {
                    e.stopPropagation();
                    handleCheckBoxChange(option);
                  }}
                >
                  <CheckBox
                    value={checkIsOptionSelected(option)}
                    color={COLORS.primary}
                    onValueChange={() => handleCheckBoxChange(option)}
                  />
                  <Text
                    key={index}
                    fontSize={16}
                    color={
                      checkIsOptionSelected(option) ? "primary" : "gray900"
                    }
                    style={{ lineHeight: 24 }}
                  >
                    {option}
                  </Text>
                </ReportListItem>
                <Spacing size={20} />
              </ReportListItemContainer>
            ))}
          </ReportList>
        </ContentContainer>

        <Spacing size={20} />
        <ButtonContainer>
          <DefaultButton
            title="확인"
            fullWidth
            onPress={() => {
              applySelectedOptions();
              closeModal();
            }}
          />
        </ButtonContainer>
        <Spacing size={14} />
      </ModalContainer>
    </OutsideContainer>
  );
};

const OutsideContainer = styled.TouchableOpacity`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.View`
  display: flex;
  text-align: center;
  width: 300px;
  background-color: ${COLORS.mainWhite};
  border-radius: 12px;
`;

const TitleContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom-width: 1.5px;
  border-bottom-color: ${COLORS.gray600};
`;

const CloseButtonContainer = styled.TouchableOpacity`
  padding: 4px;
`;

const CloseButton = styled.Image`
  width: 20px;
  height: 20px;
`;

const ContentContainer = styled.View`
  padding-inline: 16px;
`;

const ButtonContainer = styled.View`
  padding-inline: 16px;
`;

const ReportList = styled.ScrollView`
  max-height: 300px;
  overflow-y: scroll;
`;

const ReportListItemContainer = styled.View``;

const ReportListItem = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  padding-block: 4px;
  align-items: center;
  gap: 8px;
`;

const CheckBox = styled(Checkbox)`
  width: 20px;
  height: 20px;
  border-radius: 10px;
`;

export default useFrequentReportModal;
