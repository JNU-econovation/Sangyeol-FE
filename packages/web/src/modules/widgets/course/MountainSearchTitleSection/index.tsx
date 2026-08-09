import Text from "@shared/components/primitives/ui/Text";

export default function MountainSearchTitleSection() {
  return (
    <div>
      <Text display="block" fontSize="text-2xl" fontWeight="font-semibold">
        검색하고 싶은
      </Text>
      <Text color="text-primary" fontSize="text-2xl" fontWeight="font-semibold">
        산
      </Text>
      <Text fontSize="text-2xl" fontWeight="font-semibold">
        을 선택하세요
      </Text>
    </div>
  );
}
