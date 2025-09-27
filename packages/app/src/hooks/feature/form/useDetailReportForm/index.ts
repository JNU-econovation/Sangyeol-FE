import { useForm, useFormContext } from "react-hook-form";

interface DetailReportForm {
  reportContent: string;
  attachments: string[];
  reportLocation: {
    latitude: number;
    longitude: number;
  };
}

const useDetailReportForm = () => {
  return useForm<DetailReportForm>({
    defaultValues: {
      reportContent: "",
      attachments: [],
      reportLocation: {
        latitude: 0,
        longitude: 0,
      },
    },
  });
};

export const useDetailReportFormContext = () => {
  return useFormContext<DetailReportForm>();
};

export default useDetailReportForm;
