import { useEffect, useState } from "react";
import usePickImage from "./usePickImage";

interface UseImagePicker {
  onChange?: (uris: string[]) => void;
}

const useImagePicker = ({ onChange }: UseImagePicker) => {
  const [selectedImagesUri, setSelectedImagesUri] = useState<string[]>([]);
  const { pickImage } = usePickImage({
    selectedImagesUri: (result) =>
      setSelectedImagesUri((prev) => [...prev, result]),
  });

  useEffect(() => {
    if (onChange) {
      onChange(selectedImagesUri);
    }
  }, [selectedImagesUri, onChange]);

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
