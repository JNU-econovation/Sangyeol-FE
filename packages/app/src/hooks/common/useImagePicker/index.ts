import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";

interface UseImagePicker {
  onChange?: (uris: string[]) => void;
}

const useImagePicker = ({ onChange }: UseImagePicker) => {
  const [selectedImagesUri, setSelectedImagesUri] = useState<string[]>([]);

  useEffect(() => {
    if (onChange) {
      onChange(selectedImagesUri);
    }
  }, [selectedImagesUri, onChange]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImagesUri((prev) => [...prev, result.assets[0].uri]);
    }
  };

  const removeImage = (index: number) => {
    setSelectedImagesUri((prev) => prev.filter((_, i) => i !== index));
  };

  return {
    selectedImagesUri,
    pickImage,
    removeImage,
  };
};

export default useImagePicker;
