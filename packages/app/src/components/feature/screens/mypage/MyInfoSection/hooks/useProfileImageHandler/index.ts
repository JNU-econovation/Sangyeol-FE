import useImagePicker from "@hooks/common/useImagePicker";
import useProfileImageChangeModal from "@hooks/feature/modal/useProfileImageChangeModal";
import useDeleteProfileImageMutate from "@hooks/feature/query/mutate/useDeleteProfileImageMutate";
import { router } from "expo-router";

const useProfileImageHandler = () => {
  const { mutate: setDefaultImage } = useDeleteProfileImageMutate();
  const { showSelectImagePickerType } = useProfileImageChangeModal();

  const { pickImage, removeImage } = useImagePicker({
    onChange: (uris) => {
      if (uris.length !== 1) return;
      const latestUri = uris[uris.length - 1];
      if (!latestUri) return;

      router.push(
        `/(tabs)/mypage/profileImage/${encodeURIComponent(latestUri)}`,
      );
      removeImage(0);
    },
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
