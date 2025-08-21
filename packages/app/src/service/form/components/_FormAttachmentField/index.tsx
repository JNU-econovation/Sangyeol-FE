import ImageSelectField from "@entities/ImageSelectField";
import { useFieldContext } from "@service/form/context";

interface FormAttachmentFieldProps {
  title: string;
  buttonTitle: string;
}

const _FormAttachmentField = ({
  title,
  buttonTitle,
}: FormAttachmentFieldProps) => {
  const field = useFieldContext<string[]>();

  return (
    <ImageSelectField
      title={title}
      buttonTitle={buttonTitle}
      onChange={field.handleChange}
    />
  );
};

export default _FormAttachmentField;
