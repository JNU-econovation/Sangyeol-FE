import { createFormHook } from "@tanstack/react-form";

import { fieldContext, formContext } from "../context";

import _FormAttachmentField from "../components/_FormAttachmentField";
import _FormPositionSelectField from "../components/_FormPositionSelectField";
import _FormSubmitButton from "../components/_FormSubmitButton";
import _FormTextareaField from "../components/_FormTextareaField";

export const { useAppForm, withForm, withFieldGroup } = createFormHook({
  fieldComponents: {
    TextAreaField: _FormTextareaField,
    AttachmentField: _FormAttachmentField,
    PositionSelectField: _FormPositionSelectField,
  },
  formComponents: {
    SubmitButton: _FormSubmitButton,
  },
  fieldContext,
  formContext,
});
