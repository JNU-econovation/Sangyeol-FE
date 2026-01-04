import styled from "@emotion/native";
import Text from "@shared/ui/Text";
import TriangleCheckbox from "@shared/ui/TriangleCheckbox";

interface TermListItemCardProps {
  title: string;
  description?: string;
  content?: React.ReactNode;
  checked: boolean;
  onPress?: () => void;
}

const TermListItemCard = ({
  title,
  description,
  content,
  checked,
  onPress,
}: TermListItemCardProps) => {
  return (
    <ListContainer>
      <TriangleCheckbox checked={checked} onPress={onPress} />
      <ListContentContainer>
        <Text fontSize={20} fontWeight="normal" color="black">
          {title}
        </Text>
        {description && (
          <Text fontSize={12} fontWeight="normal" color="gray900">
            {description}
          </Text>
        )}
        {content && content}
      </ListContentContainer>
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
