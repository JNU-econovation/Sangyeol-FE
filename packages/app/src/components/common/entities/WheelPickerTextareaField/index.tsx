import styled from "@emotion/native";
import WheelPicker from "@quidone/react-native-wheel-picker";
import { COLORS } from "@styles/colorPalette";
import { useState } from "react";
import { Modal, Platform } from "react-native";

export interface WheelPickerOption<T = string> {
  label: string;
  value: T;
}

interface WheelPickerProps<T extends string> {
  options: WheelPickerOption<T>[];
  value: T | null;
  onChange: (value: T) => void;
  placeholder?: string;
}

const WheelPickerTextareaField = <T extends string>({
  options = [],
  value,
  onChange,
  placeholder = "선택하세요",
}: WheelPickerProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [defaultValue, setDefaultValue] = useState(value);

  const handleConfirm = () => {
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
    onChange(defaultValue!);
  };

  const getSelectedLabel = () => {
    const selected = options.find((opt) => opt.value === value);
    return selected ? selected.label : placeholder;
  };

  return (
    <>
      {/* Input Field */}
      <InputButton
        onPress={() => {
          setIsOpen(true);
          setDefaultValue(value);
        }}
      >
        <InputText hasValue={value != null}>{getSelectedLabel()}</InputText>
      </InputButton>

      {/* Modal */}
      <Modal
        visible={isOpen}
        transparent
        animationType="slide"
        onRequestClose={handleCancel}
      >
        <ModalOverlay onPress={handleCancel}>
          {/* Picker Container */}
          <PickerContainer onPress={(e) => e.stopPropagation()}>
            {/* Toolbar */}
            <Toolbar>
              <ToolbarButton onPress={handleCancel}>
                <ToolbarText>취소</ToolbarText>
              </ToolbarButton>
              <ToolbarButton onPress={handleConfirm}>
                <ToolbarTextBold>완료</ToolbarTextBold>
              </ToolbarButton>
            </Toolbar>

            {/* Picker Wheel */}
            <WheelPicker
              data={options}
              value={value}
              onValueChanged={({ item: { value } }) => {
                onChange(value);
              }}
              enableScrollByTapOnItem={true}
            />
          </PickerContainer>
        </ModalOverlay>
      </Modal>
    </>
  );
};

// Styled Components
const InputButton = styled.TouchableOpacity`
  width: 100%;
  padding: 12px 16px;
  background-color: #ffffff;
  border-width: 1px;
  border-color: #d1d5db;
  border-radius: 8px;
`;

const InputText = styled.Text<{ hasValue: boolean }>`
  font-size: 16px;
  color: ${({ hasValue }) => (hasValue ? "#111827" : "#9ca3af")};
`;

const ModalOverlay = styled.Pressable`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.2);
  justify-content: flex-end;
`;

const PickerContainer = styled.Pressable`
  background-color: #ffffff;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  ${Platform.OS === "ios" &&
  `
    shadow-color: #000;
    shadow-offset: 0px -2px;
    shadow-opacity: 0.1;
    shadow-radius: 8px;
  `}
  ${Platform.OS === "android" && "elevation: 8;"}
`;

const Toolbar = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom-width: 1px;
  border-bottom-color: #e5e7eb;
  background-color: ${COLORS.primary};
`;

const ToolbarButton = styled.TouchableOpacity``;

const ToolbarText = styled.Text`
  font-size: 16px;
  color: #ffffff;
`;

const ToolbarTextBold = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
`;

export default WheelPickerTextareaField;
