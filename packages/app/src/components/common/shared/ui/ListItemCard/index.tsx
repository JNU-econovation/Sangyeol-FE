import styled from "@emotion/native";
import {
  ChosenTriangle,
  PointerPolygon,
  WeekGreenTriangle,
  WeekTriangle,
} from "@shared/ui/Icons";
import Text from "@shared/ui/Text";
import { COLORS } from "@styles/colorPalette";

interface ListItemCardProps {
  title: string;
  disabled?: boolean;
  selected?: boolean;
  checked?: boolean;
}

const ListItemCard = ({
  title,
  disabled = false,
  selected = false,
  checked = false,
}: ListItemCardProps) => {
  return (
    <PermissionListItemContainer>
      <PermissionListItem disabled={disabled}>
        <PermissionListItemTextContainer>
          <Text
            fontSize={16}
            fontWeight="normal"
            color={disabled ? "gray200" : "black"}
          >
            {title}
          </Text>
          <Text
            fontSize={16}
            fontWeight="normal"
            color={disabled ? "gray200" : "mainGreen"}
          >
            필수
          </Text>
        </PermissionListItemTextContainer>
        {!checked ? (
          disabled ? (
            <WeekTriangle />
          ) : (
            <WeekGreenTriangle />
          )
        ) : (
          <ChosenTriangle />
        )}
      </PermissionListItem>
      {selected && (
        <PointerPolygon style={{ transform: [{ translateX: 10 }] }} />
      )}
    </PermissionListItemContainer>
  );
};

const PermissionListItemContainer = styled.View`
  width: 100%;
  align-items: center;
  flex-direction: row;
  overflow-x: hidden;
  background-color: white;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const PermissionListItem = styled.View<Pick<ListItemCardProps, "disabled">>`
  width: 331px;
  height: 62px;
  background: white;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-inline: 20px;
  background-color: ${({ disabled }) =>
    disabled ? COLORS.disabledGray : "white"};
  elevation: 4;
`;

const PermissionListItemTextContainer = styled.View`
  flex: 1;
  flex-direction: row;
  display: flex;
  padding: 12px 16px;
  align-items: center;
  gap: 16px;
`;

export default ListItemCard;
