import styled from "@emotion/native";
import useModal from "@service/modal/hooks";
import Spacing from "@shared/layout/Spacing";
import DefaultButton from "@shared/ui/buttons/DefaultButton";
import Text from "@shared/ui/Text";
import { COLORS } from "@styles/colorPalette";
import { useCallback } from "react";
import useLogoutAlertModal from "../useLogoutAlertModal";

const useLogoutModal = () => {
  const { openModal, closeModal } = useModal();

  const showLogoutModal = () => {
    openModal(<ModalComponent closeModal={closeModal} />, {
      transparent: true,
      animationType: "none",
      hardwareAccelerated: true,
    });
  };

  return { showLogoutModal };
};

const ModalComponent = ({ closeModal }: { closeModal: () => void }) => {
  const { showLogoutAlertModal } = useLogoutAlertModal();

  const handleLogout = useCallback(async () => {
    closeModal();
    showLogoutAlertModal();
  }, [closeModal, showLogoutAlertModal]);

  return (
    <OutsideContainer activeOpacity={1} onPress={closeModal}>
      <ModalContainer>
        <Text fontSize={16} fontWeight="medium">
          로그아웃하시겠습니까?
        </Text>
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
            <DefaultButton title="확인" onPress={handleLogout} />
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
  gap: 8px;
`;

const ButtonItem = styled.View`
  flex-grow: 1;
  padding-inline: auto;
`;

export default useLogoutModal;
