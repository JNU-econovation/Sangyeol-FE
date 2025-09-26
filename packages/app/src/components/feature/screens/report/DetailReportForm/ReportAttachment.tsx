import ImageSelectField from "@components/common/entities/ImageSelectField";
import { Controller } from "react-hook-form";

const ReportAttachment = () => {
  return (
    <Controller
      name="attachments"
      render={({ field: { onChange } }) => (
        <ImageSelectField
          title="첨부 파일"
          buttonTitle="파일 +"
          onChange={onChange}
        />
      )}
    />
  );
};

export default ReportAttachment;
