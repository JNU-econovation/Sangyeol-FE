import styled from "@emotion/native";
import { ChevronLeft } from "@shared/ui/Icons";
import Text from "@shared/ui/Text";
import TriangleCheckbox from "@shared/ui/TriangleCheckbox";
import { router } from "expo-router";
import { Pressable } from "react-native";

interface TermListItemCardProps {
  title: string;
  description?: string;
  content?: React.ReactNode;
  checked: boolean;
  termLink?: string;
  onPress?: () => void;
}

const TermListItemCard = ({
  title,
  description,
  content,
  checked,
  termLink,
  onPress,
}: TermListItemCardProps) => {
  const openTermLink = () => {
    if (!termLink) return;
    router.push(`/webModal/${encodeURIComponent(termLink)}`);
  };

  return (
    <ListContainer>
      <TriangleCheckbox checked={checked} onPress={onPress} />
      <Pressable
        onPress={openTermLink}
        style={{ flex: 1, flexDirection: "row" }}
      >
        <ListContentContainer>
          <Text fontSize={14} fontWeight="normal" color="black">
            {title}
          </Text>
          {description && (
            <Text fontSize={12} fontWeight="normal" color="gray900">
              {description}
            </Text>
          )}
          {content && content}
          {/* </Pressable> */}
        </ListContentContainer>
        {termLink && <ChevronLeft />}
        {/* <Pressable onPress={openTermLink}> */}
      </Pressable>
    </ListContainer>
  );
};
const ListContainer = styled.View`
  gap: 12px;
  flex-direction: row;
`;

const ListContentContainer = styled.View`
  flex: 1;
  justify-content: center;
`;

export default TermListItemCard;
