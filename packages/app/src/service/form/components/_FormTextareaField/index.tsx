import { useFieldContext } from "@service/form/context";
import TextAreaField from "@shared/ui/TextareaField";
import { COLORS } from "@styles/colorPalette";

interface TextAreaFieldProps
  extends React.ComponentProps<typeof TextAreaField> {
  title: string;
}

const _FormTextareaField = ({ title, ...props }: TextAreaFieldProps) => {
  const field = useFieldContext<string>();

  return (
    <TextAreaField
      title={title}
      multiline
      numberOfLines={3}
      textAlignVertical="top"
      placeholderTextColor={COLORS.gray200}
      value={field.state.value}
      onChangeText={field.handleChange}
      {...props}
    />
  );
};

export default _FormTextareaField;
