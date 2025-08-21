import { useFormContext } from "@service/form/context";
import DefaultButton from "@shared/ui/buttons/DefaultButton";
import { ComponentProps } from "react";

interface FormSubmitButtonProps
  extends Omit<ComponentProps<typeof DefaultButton>, "onPress"> {
  title: string;
}

const _FormSubmitButton = ({ title, ...props }: FormSubmitButtonProps) => {
  const form = useFormContext();

  return <DefaultButton title={title} onPress={form.handleSubmit} {...props} />;
};

export default _FormSubmitButton;
