import styled from "@emotion/native";
import { NoticeBarState } from "@service/notice-bar/types";
import Text from "@shared/ui/Text";
import { useCallback, useEffect, useRef } from "react";
import { Animated } from "react-native";

interface NoticeContainerProps {
  zIndex?: number;
}

interface NoticeBarProps extends NoticeContainerProps {
  message: string;
  duration: number;
  setQueue: React.Dispatch<React.SetStateAction<NoticeBarState[]>>; //TODO: 해당 값을 받지 않도록 수정해야함
}

const NoticeBar = ({ message, duration, zIndex, setQueue }: NoticeBarProps) => {
  const timeIdRef = useRef<number[]>([]);
  const animate = useRef(new Animated.Value(-92)).current;

  const hideNotice = useCallback(() => {
    Animated.timing(animate, {
      toValue: -92,
      duration: 250,
      useNativeDriver: true,
    }).start();
    timeIdRef.current.push(
      setTimeout(() => {
        setQueue((prevQueue) => prevQueue.slice(1));
      }, 250),
    );
  }, [animate]);

  useEffect(() => {
    Animated.timing(animate, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [animate]);

  useEffect(() => {
    let timeId: number;
    if (duration) {
      timeId = setTimeout(hideNotice, duration);
    }

    return () => {
      timeId && clearTimeout(timeId);
      timeIdRef.current.forEach(clearTimeout);
    };
  }, [duration, hideNotice]);

  return (
    <Animated.View
      onTouchEnd={hideNotice}
      style={{
        position: "absolute",
        zIndex: zIndex,
        top: 0,
        left: 0,
        width: "100%",
        transform: [{ translateY: animate }],
      }}
    >
      <NoticeContainer style={{ zIndex }}>
        <TextContainer>
          <Text>{message}</Text>
        </TextContainer>
      </NoticeContainer>
    </Animated.View>
  );
};

const NoticeContainer = styled.View<NoticeContainerProps>`
  width: 100%;
  background-color: #ddefe3; //TODO: 색상 정리 필요
  height: 92px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: flex-end;
  z-index: ${({ zIndex }) => (zIndex ? +100 : 0)};
  /* Android */
  elevation: 4;
`;

const TextContainer = styled.View`
  padding-inline: 23px;
  padding-bottom: 8px;
`;

export default NoticeBar;
