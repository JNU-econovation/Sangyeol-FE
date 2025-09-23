import Text from "@components/common/shared/ui/Text";
import ERROR_CODES from "@constants/api/error";
import styled from "@emotion/native";
import type { ErrorResponse } from "@model/api";
import { useTokenStore } from "@store/secureStorage/useTokenStore";
import { useErrorBoundaryFallbackProps } from "@suspensive/react";

const GlobalErrorFallback = () => {
  const {
    reset,
    error: { errorCode },
  } = useErrorBoundaryFallbackProps<ErrorResponse>();
  const { clearTokens } = useTokenStore.getState();

  const handleErrorReset = () => {
    reset();
    clearTokens();
  };

  return (
    <Container>
      <Text color="primary" fontSize={28} fontWeight="regular">
        {/* 혹시나 백엔드에서 합의되지 않은 에러 코드가 오는 경우를 재비하여 옵셔널로 보여주기 */}
        {ERROR_CODES[errorCode]?.message}
      </Text>
      <ResetButton onPress={handleErrorReset}>
        <ResetButtonText>앱 재시작</ResetButtonText>
      </ResetButton>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

const ResetButton = styled.TouchableOpacity`
  margin-top: 16px;
  padding: 8px 16px;
  background-color: #007aff;
  border-radius: 8px;
`;

const ResetButtonText = styled.Text`
  color: white;
  font-size: 16px;
`;

export default GlobalErrorFallback;
