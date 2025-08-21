import Text from "@shared/ui/Text";
import Textarea from "@shared/ui/Textarea";
import styled from "@emotion/native";
import { View } from "react-native";

interface LabeledInputProps extends React.ComponentProps<typeof Textarea> {
  labelText: string;
}

const LabeledInput = ({ labelText, ...props }: LabeledInputProps) => {
  return (
    <Container>
      <View style={{ width: 80, alignItems: "flex-start" }}>
        <Text fontSize={16}>{labelText}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Textarea {...props} />
      </View>
    </Container>
  );
};

const Container = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: nowrap;
  gap: 8px;
  width: 100%;
`;

export default LabeledInput;
