import useImagePicker from "@hooks/common/useImagePicker";
import useProfileImageChangeModal from "@hooks/feature/modal/useProfileImageChangeModal";
import useDeleteProfileImageMutate from "@hooks/feature/query/mutate/useDeleteProfileImageMutate";
import { router } from "expo-router";
import { useEffect } from "react";

const useProfileImageHandler = () => {
  const { mutate: setDefaultImage } = useDeleteProfileImageMutate();
  const { showSelectImagePickerType } = useProfileImageChangeModal();

  const { pickImage, removeImage, selectedImagesUri } = useImagePicker({
    onChange: (uris) => {
      if (uris.length !== 1) return;
      const latestUri = uris[uris.length - 1];
      if (!latestUri) return;

      router.push(
        `/(tabs)/mypage/profileImage/${encodeURIComponent(latestUri)}`,
      );
    },
  });

  useEffect(() => {
    selectedImagesUri.forEach((_, i) => removeImage(i));
  });

  const handleProfileImage = () => {
    showSelectImagePickerType({
      onSelectCamera: () => {
        pickImage("camera");
      },
      onSelectGallery: () => {
        pickImage("photoLibrary");
      },
      onSelectDefaultImage: () => {
        setDefaultImage();
      },
    });
  };

  return { handleProfileImage };
};

export default useProfileImageHandler;
