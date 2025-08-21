import Flex from "@shared/layout/Flex";
import Button from "@shared/ui/Button";
import AppleLogo from "@shared/ui/icons/AppleLogoIcon";
import Text from "@shared/ui/Text";

export default function AppleLoginButton() {
  return (
    <Button color="black" size="lg" fullWidth={true}>
      <Flex
        flexDirection="flex-row"
        alignItems="items-center"
        justifyContent="justify-center"
        gap={3}
      >
        <AppleLogo />
        <Text color="text-white" fontSize="text-sm" fontWeight="font-semibold">
          Apple로 계속하기
        </Text>
      </Flex>
    </Button>
  );
}
