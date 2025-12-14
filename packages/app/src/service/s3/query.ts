import authenticatedApi from "@api/_instances/authenticatedApi";
import { FileFormat, postProfileImageSave, postS3Key } from "api";

const uploadProfileImage = async (
  fileUri: string,
  fileType: FileFormat = "PNG",
): Promise<{ success: boolean; error?: string }> => {
  try {
    // 1. Presigned URL 획득
    const {
      presignedUrlDTO: { presignedUrl, fileName },
    } = await postProfileImageSave(authenticatedApi, fileType);

    // 2. 파일을 blob으로 읽기
    const response = await fetch(fileUri);
    const blob = await response.blob();

    // 3. S3에 업로드
    const uploadResponse = await fetch(presignedUrl, {
      method: "PUT",
      body: blob,
      headers: {
        "Content-Type": `image/${fileType.toLowerCase()}`,
      },
    });

    // 4. 에러 처리
    if (!uploadResponse.ok) {
      const errorMsg = "S3 업로드 실패";
      const errorDetail = await uploadResponse.text();
      console.error(errorMsg, errorDetail);
      return { success: false, error: `${errorMsg}: ${errorDetail}` };
    }

    // 5. S3 키 저장
    await postS3Key(authenticatedApi, { fileName });

    return { success: true };
  } catch (e) {
    const errorMsg = e instanceof Error ? e.message : "알 수 없는 오류";
    console.error("프로필 이미지 업로드 실패:", e);
    return { success: false, error: errorMsg };
  }
};

export default uploadProfileImage;
