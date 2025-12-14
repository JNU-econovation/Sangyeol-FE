import { COLORS } from "@/src/styles/colorPalette";
import styled from "@emotion/native";
import useModal from "@service/modal/hooks";
import Spacing from "@shared/layout/Spacing";
import DefaultButton from "@shared/ui/buttons/DefaultButton";
import { useCallback } from "react";

const BUTTON_PADDING_VERTICAL = 24;

interface ShowSelectImagePickerTypeParams {
  onSelectCamera: () => void;
  onSelectGallery: () => void;
  onSelectDefaultImage: () => void;
}

const useProfileImageChangeModal = () => {
  const { openModal, closeModal } = useModal();

  const showSelectImagePickerType = (
    params: ShowSelectImagePickerTypeParams,
  ) => {
    openModal(<ModalComponent closeModal={closeModal} {...params} />, {
      transparent: true,
      animationType: "none",
      hardwareAccelerated: true,
    });
  };

  return { showSelectImagePickerType };
};

interface ModalComponentProps extends ShowSelectImagePickerTypeParams {
  closeModal: () => void;
}

const ModalComponent = ({
  closeModal,
  onSelectCamera,
  onSelectGallery,
  onSelectDefaultImage,
}: ModalComponentProps) => {
  const cancel = useCallback(() => {
    closeModal();
  }, [closeModal]);

  const selectCamera = useCallback(() => {
    closeModal();
    onSelectCamera();
  }, [closeModal]);

  const selectGallery = useCallback(() => {
    closeModal();
    onSelectGallery();
  }, [closeModal]);

  const selectDefaultImage = useCallback(() => {
    closeModal();
    onSelectDefaultImage();
  }, [closeModal]);

  return (
    <OutsideContainer activeOpacity={1} onPress={closeModal}>
      <ModalContainer>
        <ButtonContainer>
          <SelectButtonsContainer>
            <DefaultButton
              title="카메라"
              backgroundColor="mainWhite"
              color="black"
              onPress={selectCamera}
              fullWidth
              paddingVertical={BUTTON_PADDING_VERTICAL}
            />
            <ButtonSeperator />
            <DefaultButton
              title="갤러리"
              backgroundColor="mainWhite"
              color="black"
              onPress={selectGallery}
              fullWidth
              paddingVertical={BUTTON_PADDING_VERTICAL}
            />
            <ButtonSeperator />
            <DefaultButton
              title="기본 이미지"
              backgroundColor="mainWhite"
              color="black"
              onPress={selectDefaultImage}
              fullWidth
              paddingVertical={BUTTON_PADDING_VERTICAL}
            />
          </SelectButtonsContainer>
          <Spacing size={20} />
          <DefaultButton
            title="취소"
            backgroundColor="mainWhite"
            color="black"
            fullWidth
            onPress={cancel}
            paddingVertical={BUTTON_PADDING_VERTICAL}
          />
        </ButtonContainer>
      </ModalContainer>
    </OutsideContainer>
  );
};

const OutsideContainer = styled.TouchableOpacity`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContainer = styled.View`
  position: absolute;
  bottom: 40px;
  display: flex;
  text-align: center;
  width: 100%;
  padding: 30px;
  padding-bottom: 20px;
  border-radius: 12px;
  align-items: center;
  gap: 6px;
  justify-content: center;
  align-items: center;
`;

const ButtonContainer = styled.View`
  width: 98%;
`;

const SelectButtonsContainer = styled.View`
  width: 100%;
  margin-top: 20px;
  background-color: white;
  border-radius: 8px;
`;

const ButtonSeperator = styled.View`
  height: 1px;
  background-color: ${COLORS.gray400};
`;

export default useProfileImageChangeModal;
