import Spacing from "@shared/layout/Spacing";
import Text from "@shared/ui/Text";

const PermissionHeaderSection = () => {
  return (
    <>
      <Text color="mainGreen" fontWeight="semibold" fontSize={24}>
        안전한 산행을 위한
      </Text>
      <Text color="mainGreen" fontWeight="semibold" fontSize={24}>
        3단계 설정
      </Text>
      <Spacing size={27} />
      <Text color="gray20" fontSize={14} fontWeight="normal">
        여러분의 안전한 산행을 위해 꼭 필요한
      </Text>
      <Text color="gray20" fontSize={14} fontWeight="normal">
        권한만 요청합니다.
      </Text>
    </>
  );
};

export default PermissionHeaderSection;
