import styled from "@emotion/native";
import useModal from "@service/modal/hooks";
import Spacing from "@shared/layout/Spacing";
import DefaultButton from "@shared/ui/buttons/DefaultButton";
import Text from "@shared/ui/Text";
import { COLORS } from "@styles/colorPalette";
import { router } from "expo-router";
import { useCallback } from "react";

const useLogoutAlertModal = () => {
  const { openModal, closeModal } = useModal();

  const showLogoutAlertModal = () => {
    openModal(<ModalComponent closeModal={closeModal} />, {
      transparent: true,
      animationType: "none",
      hardwareAccelerated: true,
    });
  };

  return { showLogoutAlertModal };
};

const ModalComponent = ({ closeModal }: { closeModal: () => void }) => {
  const handleConfirm = useCallback(() => {
    closeModal();
    router.replace("/starter");
  }, [closeModal]);

  return (
    <OutsideContainer activeOpacity={1} onPress={closeModal}>
      <ModalContainer>
        <Text fontSize={16} fontWeight="medium" textAlign="center">
          로그아웃이 완료되었습니다.
        </Text>
        <Text fontSize={16} fontWeight="medium" textAlign="center">
          확인 버튼을 누를 시
        </Text>
        <Text fontSize={16} fontWeight="medium" textAlign="center">
          로그인 화면으로 돌아갑니다.
        </Text>
        <Spacing size={20} />
        <ButtonContainer>
          <ButtonItem>
            <DefaultButton title="확인" onPress={handleConfirm} />
          </ButtonItem>
        </ButtonContainer>
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
  padding: 30px;
  padding-bottom: 20px;
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

export default useLogoutAlertModal;
