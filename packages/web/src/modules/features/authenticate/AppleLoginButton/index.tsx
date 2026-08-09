import Flex from "@shared/components/primitives/layout/Flex";
import Button from "@shared/components/primitives/ui/Button";
import AppleLogo from "@icons/AppleLogoIcon";
import Text from "@shared/components/primitives/ui/Text";

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
