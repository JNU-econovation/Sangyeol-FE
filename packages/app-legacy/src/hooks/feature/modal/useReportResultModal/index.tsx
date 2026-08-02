import Spacing from "@components/common/shared/layout/Spacing";
import DefaultButton from "@components/common/shared/ui/buttons/DefaultButton";
import Text from "@components/common/shared/ui/Text";
import styled from "@emotion/native";
import useModal from "@service/modal/hooks";
import { COLORS } from "@styles/colorPalette";

const useReportResultModal = () => {
  const { openModal, closeModal } = useModal();

  const showReportResult = () => {
    openModal(<ModalComponent closeModal={closeModal} />, {
      transparent: true,
      animationType: "none",
      hardwareAccelerated: true,
    });
  };

  return { showReportResult };
};

const ModalComponent = ({ closeModal }: { closeModal: () => void }) => {
  return (
    <OutsideContainer activeOpacity={1} onPress={closeModal}>
      <ModalContainer>
        <TextContainer>
          <Text fontSize={16} fontWeight="medium" textAlign="center">
            위치 전송이 완료되었습니다.
          </Text>
          <Spacing size={32} />
          <Text fontSize={16} fontWeight="black" color="red" textAlign="center">
            잠시 후 구조대원의 연락이 올 예정입니다.
          </Text>
          <Text fontSize={16} fontWeight="black" color="red">
            꼭 받아주세요.
          </Text>
          <Spacing size={32} />
          <Text fontSize={16} fontWeight="medium" textAlign="center">
            [확인] 버튼을 누르면 안전 매뉴얼로 이동합니다.
          </Text>
        </TextContainer>

        <Spacing size={20} />
        <ButtonContainer>
          <ButtonItem>
            <DefaultButton title="확인" onPress={closeModal} />
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
  padding-inline: 16px;
  padding-block-start: 40px;
  padding-block-end: 16px;
  background-color: ${COLORS.mainWhite};
  border-radius: 12px;
  align-items: center;
`;

const TextContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
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

export default useReportResultModal;
