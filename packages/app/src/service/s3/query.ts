import authenticatedApi from "@api/_instances/authenticatedApi";
import { postProfileImageSave, postS3Key } from "api";

const uploadProfileImage = async (formData: FormData) => {
  try {
    const {
      presignedUrlDTO: { presignedUrl, fileName },
    } = await postProfileImageSave(authenticatedApi, "PNG"); //TODO: png 하드코딩 수정하기

    const uploadResponse = await fetch(presignedUrl, {
      method: "PUT",
      body: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (!uploadResponse.ok) {
      throw new Error("s3 업로드 실패");
    }

    await postS3Key(authenticatedApi, { fileName });
  } catch (e) {
    console.error("프로필 이미지 업로드 실패:", e);
  }
};

export default uploadProfileImage;
