import * as ImagePicker from "expo-image-picker";

type PickerType = "camera" | "photoLibrary";

interface UseImagePicker {
  selectedImagesUri: (uris: string) => void;
}

const usePickImage = ({ selectedImagesUri }: UseImagePicker) => {
  const pickImage = async (pickerType: PickerType) => {
    if (pickerType === "camera") {
      const cameraPermission =
        await ImagePicker.requestCameraPermissionsAsync();

      if (cameraPermission.status !== "granted") {
        return;
      }

      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: "images",
        quality: 1,
      });

      if (!result.canceled) {
        // setSelectedImagesUri((prev) => [...prev, result.assets[0].uri]);
        selectedImagesUri(result.assets[0].uri);
      }
      return;
    }

    const mediaLibraryPermission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (mediaLibraryPermission.status !== "granted") {
      console.log("Permission to access camera or media library was denied");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      quality: 1,
    });

    if (!result.canceled) {
      // setSelectedImagesUri((prev) => [...prev, result.assets[0].uri]);
      selectedImagesUri(result.assets[0].uri);
    }
  };

  return { pickImage };
};

export default usePickImage;
