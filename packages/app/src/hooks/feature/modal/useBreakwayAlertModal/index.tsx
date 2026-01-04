import styled from "@emotion/native";
import useModal from "@service/modal/hooks";
import Spacing from "@shared/layout/Spacing";
import { COLORS } from "@styles/colorPalette";
import * as Haptics from "expo-haptics";
import { useEffect, useRef, useState } from "react";

const useBreakwayAlertModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { openModal, closeModal } = useModal();
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    if (!timeoutRef.current) {
      timeoutRef.current = setTimeout(() => {
        setIsOpen(false);
        closeModal();
      }, 15 * 1000);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isOpen]);

  const showReportResult = () => {
    if (isOpen) return;
    setIsOpen(true);
    openModal(<ModalComponent />, {
      transparent: false,
      animationType: "none",
      hardwareAccelerated: true,
    });
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  const closeAlertModal = () => {
    if (!isOpen) return;

    setIsOpen(false);
    closeModal();
  };

  return { showReportResult, closeAlertModal };
};

// Modal Component
const ModalComponent = () => {
  return (
    <OutsideContainer activeOpacity={1}>
      <ModalContainer>
        <Spacing size={14} />
        <Icon source={require("@assets/icons/alert/Alert_Message.png")} />
        <Spacing size={18} />
        <Title>
          <Emphasis>경로를 이탈</Emphasis>하였습니다.
        </Title>
        <Spacing size={10} />
        <Description>다시 경로로 진입하세요.</Description>
        <Spacing size={18} />
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

const Icon = styled.Image`
  width: 64px;
  height: 64px;
`;

const Title = styled.Text`
  font-size: 22px;
`;

const Emphasis = styled.Text`
  font-weight: bold;
  color: ${COLORS.red};
`;

const Description = styled.Text`
  font-size: 16px;
  color: ${COLORS.gray700};
`;

export default useBreakwayAlertModal;
