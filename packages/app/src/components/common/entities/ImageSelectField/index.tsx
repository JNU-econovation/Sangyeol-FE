import styled from "@emotion/native";
import useImagePicker from "@hooks/common/useImagePicker";
import FieldLayout from "@shared/layout/FieldLayout";
import WeakButton from "@shared/ui/WeakButton";

interface ImageSelectFieldProps {
  title: string;
  buttonTitle: string;
  onChange?: (uris: string[]) => void;
  value?: string[];
}

const ImageSelectField = ({
  title,
  buttonTitle,
  onChange,
}: ImageSelectFieldProps) => {
  const { selectedImagesUri, pickImage } = useImagePicker({ onChange });

  return (
    <FieldLayout
      title={title}
      titleSideComponent={
        <WeakButton title={buttonTitle} onPress={pickImage} />
      }
      content={
        <ImageContainer>
          {selectedImagesUri &&
            selectedImagesUri.map((uri, index) => (
              <AttachmentItem
                key={`${uri}-${index}`}
                source={{ uri }}
                style={{ width: 85, height: 85, borderRadius: 8 }}
              />
            ))}
          {selectedImagesUri?.length === 0 && <EmptyAttachmentItem />}
        </ImageContainer>
      }
    />
  );
};

const ImageContainer = styled.View`
  flex-direction: row;
`;

const AttachmentItem = styled.Image`
  width: 85px;
  height: 85px;
  border-radius: 8px;
  background-color: #f0f0f0;
`;

const EmptyAttachmentItem = styled.View`
  width: 85px;
  height: 85px;
  border-radius: 8px;
  background-color: #f0f0f0;
  justify-content: center;
  align-items: center;
`;

export default ImageSelectField;
