import styled from "@emotion/native";
import useModal from "@service/modal/hooks";
import Spacing from "@shared/layout/Spacing";
import DefaultButton from "@shared/ui/buttons/DefaultButton";
import Text from "@shared/ui/Text";
import { COLORS } from "@styles/colorPalette";
import { useCallback } from "react";

const useNotificationModal = () => {
  const { openModal, closeModal } = useModal();

  const showNotificationModal = ({
    onConfirm,
    onCancel,
  }: {
    onConfirm?: () => void;
    onCancel?: () => void;
  }) => {
    openModal(
      <ModalComponent
        closeModal={closeModal}
        onConfirm={onConfirm}
        onCancel={onCancel}
      />,
      {
        transparent: true,
        animationType: "none",
        hardwareAccelerated: true,
      },
    );
  };

  return { showNotificationModal };
};

const ModalComponent = ({
  closeModal,
  onConfirm,
  onCancel,
}: {
  closeModal: () => void;
  onConfirm?: () => void;
  onCancel?: () => void;
}) => {
  const handleConfirm = useCallback(() => {
    if (onConfirm) {
      onConfirm();
    }
    closeModal();
  }, [closeModal]);

  const handleCancel = useCallback(() => {
    if (onCancel) {
      onCancel();
    }
    closeModal();
  }, [closeModal]);

  return (
    <OutsideContainer activeOpacity={1} onPress={closeModal}>
      <ModalContainer>
        <Text>알림을 해제할 시</Text>
        <Text>안전한 산행 지원이 어려워집니다.</Text>
        <Text>해제하시겠습니까?</Text>
        <Spacing size={20} />
        <ButtonContainer>
          <ButtonItem>
            <DefaultButton
              title="취소"
              onPress={handleCancel}
              backgroundColor="gray700"
              color="mainWhite"
            />
          </ButtonItem>
          <Spacing size={4} horizontal />
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
  padding: 20px;
  padding-top: 40px;
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

export default useNotificationModal;
