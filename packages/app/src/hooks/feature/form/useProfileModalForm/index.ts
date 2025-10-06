import { useForm, useFormContext } from "react-hook-form";

interface ProfileModalFormValues {
  name: string;
  weight: number;
  height: number;
  bloodType: "A" | "B" | "AB" | "O";

  nameHelperState: "none" | "necessary";
  weightHelperState: "none" | "necessary";
  heightHelperState: "none" | "necessary";
  bloodTypeHelperState: "none" | "necessary";
}

export const useProfileModalForm = () => {
  return useForm<ProfileModalFormValues>({
    defaultValues: {
      name: "",
      weight: 0,
      height: 0,
      bloodType: "A",
      nameHelperState: "none",
      weightHelperState: "none",
      heightHelperState: "none",
      bloodTypeHelperState: "none",
    },
  });
};

export const useProfileModalFormContext = () => {
  return useFormContext<ProfileModalFormValues>();
};
