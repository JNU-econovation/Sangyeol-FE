import {
  ChosenTriangle,
  WeekGreenTriangle,
  WeekTriangle,
} from "@shared/ui/Icons";
import { TouchableOpacity } from "react-native";

interface TriangleCheckboxProps {
  disabled?: boolean;
  checked?: boolean;
  onPress?: () => void;
}

const TriangleCheckbox = ({
  disabled = false,
  checked = false,
  onPress,
}: TriangleCheckboxProps) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      {!checked ? (
        disabled ? (
          <WeekTriangle />
        ) : (
          <WeekGreenTriangle />
        )
      ) : (
        <ChosenTriangle />
      )}
    </TouchableOpacity>
  );
};

export default TriangleCheckbox;
