import ImageSelectField from "@entities/ImageSelectField";
import { Controller } from "react-hook-form";

const ReportAttachment = () => {
  return (
    <Controller
      name="attachments"
      render={({ field: { onChange, value } }) => (
        <ImageSelectField
          title="첨부 파일"
          buttonTitle="파일 +"
          value={value}
          onChange={onChange}
        />
      )}
    />
  );
};

export default ReportAttachment;
