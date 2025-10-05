import styled from "@emotion/native";
import Text from "@shared/ui/Text";
import { COLORS } from "@styles/colorPalette";
import { Switch } from "react-native";

interface SwitchItemProps {
  text: string;
  value?: boolean;
  onToggle?: (value: boolean) => void;

  // style
  borderBottom?: boolean;
}

const SwitchItem = ({
  text,
  value,
  onToggle,
  borderBottom,
}: SwitchItemProps) => {
  return (
    <NotificationItem borderBottom={borderBottom}>
      <Text fontSize={16} fontWeight="medium">
        {text}
      </Text>

      <Switch
        value={value}
        onValueChange={() => {
          onToggle?.(!value);
        }}
      />
    </NotificationItem>
  );
};

const NotificationItem = styled.View<{ borderBottom?: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom-width: ${({ borderBottom }) => (borderBottom ? "1px" : "0px")};
  border-bottom-color: ${COLORS.gray400};
  border-bottom-style: solid;
  padding-bottom: 12px;
`;

export default SwitchItem;
