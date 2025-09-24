import styled from "@emotion/native";
import useModal from "@service/modal/hooks";
import Spacing from "@shared/layout/Spacing";
import DefaultButton from "@shared/ui/buttons/DefaultButton";
import Text from "@shared/ui/Text";
import { COLORS } from "@styles/colorPalette";
import { router } from "expo-router";
import { useCallback, useState } from "react";
import { View } from "react-native";
import { Checkbox } from "expo-checkbox";
import useSetModalAlertStore from "@store/asyncStorage/useSetModalAlertStore";

const useReportAlertModal = () => {
  const { openModal, closeModal } = useModal();

  const showReportAlert = () => {
    openModal(<ModalComponent closeModal={closeModal} />, {
      transparent: true,
      animationType: "none",
      hardwareAccelerated: true,
    });
  };

  return { showReportAlert };
};

const ModalComponent = ({ closeModal }: { closeModal: () => void }) => {
  const [isChecked, setChecked] = useState(false);
  const { setIsShowReportAlert: setShowReportAlert } = useSetModalAlertStore();

  const onConfirm = useCallback(() => {
    router.push("/report");
    closeModal();
    setShowReportAlert(!isChecked);
  }, [closeModal]);

  return (
    <OutsideContainer activeOpacity={1} onPress={closeModal}>
      <ModalContainer>
        <Text fontSize={14} fontWeight="medium">
          다음 화면에서 문자를 통해
        </Text>
        <Text fontSize={14} fontWeight="medium">
          산학 구조대에 신고할 수 있습니다.
        </Text>
        <Spacing size={20} />
        <Text fontSize={15} fontWeight="medium">
          허위 신고 시,
        </Text>
        <Text fontSize={15} fontWeight="medium">
          소방 기본법 제56조에 따라
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text fontSize={15} fontWeight="bold">
            최대 200만 원
          </Text>
          <Text fontSize={15} fontWeight="medium">
            의 과태료가 부과됩니다.
          </Text>
        </View>

        <Spacing size={20} />
        <ButtonContainer>
          <ButtonItem>
            <DefaultButton
              title="취소"
              onPress={closeModal}
              backgroundColor="gray700"
              color="mainWhite"
            />
          </ButtonItem>
          <Spacing size={4} horizontal />
          <ButtonItem>
            <DefaultButton title="확인" onPress={onConfirm} />
          </ButtonItem>
        </ButtonContainer>
      </ModalContainer>
      <Spacing size={16} />

      <DismissibleArea onPress={() => setChecked(!isChecked)}>
        <CheckBox value={isChecked} disabled />
        <Text color="mainWhite">앞으로 보지 않기</Text>
      </DismissibleArea>
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
  padding: 30px;
  background-color: ${COLORS.mainWhite};
  border-radius: 12px;
  align-items: center;
  gap: 6px;
`;

const ButtonContainer = styled.View`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  width: 100%;
  justify-content: flex-end;
  align-items: center;
`;

const ButtonItem = styled.View`
  flex-grow: 1;
  padding-inline: auto;
`;

const DismissibleArea = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  gap: 8px;
  padding: 8px;
`;

const CheckBox = styled(Checkbox)`
  width: 20px;
  height: 20px;
  border-radius: 10px;
`;

export default useReportAlertModal;
