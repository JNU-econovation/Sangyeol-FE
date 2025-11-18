import styled from "@emotion/native";
import useImagePicker from "@hooks/common/useImagePicker";
import useSelectImagePickerTypeModal from "@hooks/feature/modal/useSelectImagePickerTypeModal";
import FieldLayout, { FieldLayoutProps } from "@shared/layout/FieldLayout";
import { Rounded_X } from "@shared/ui/Icons";
import Text from "@shared/ui/Text";
import { COLORS } from "@styles/colorPalette";

const MAX_IMAGE_COUNT = 3;

interface ImageSelectFieldProps extends Omit<FieldLayoutProps, "content"> {
  title: string;
  titleButton?: boolean;
  buttonTitle: string;
  onChange?: (uris: string[]) => void;
  value?: string[];
}

const ImageSelectField = ({
  title,
  onChange,
  ...props
}: ImageSelectFieldProps) => {
  const { selectedImagesUri, pickImage, removeImage } = useImagePicker({
    onChange,
  });
  const { showSelectImagePickerType } = useSelectImagePickerTypeModal();

  const handleAddImage = () => {
    showSelectImagePickerType({
      onSelectCamera: () => pickImage("camera"),
      onSelectGallery: () => pickImage("photoLibrary"),
    });
  };

  return (
    <FieldLayout
      title={title}
      content={
        <ImageContainer>
          {selectedImagesUri &&
            selectedImagesUri.map((uri, index) => (
              <AttachmentItemContainer key={`${uri}-${index}`}>
                <AttachmentItem source={{ uri }} />
                <AttachmentItemDeleteButton
                  onPress={() => {
                    removeImage(index);
                  }}
                >
                  <Rounded_X />
                </AttachmentItemDeleteButton>
              </AttachmentItemContainer>
            ))}
          {(!selectedImagesUri ||
            selectedImagesUri?.length < MAX_IMAGE_COUNT) && (
            <EmptyAttachmentItem onPress={handleAddImage}>
              <Text color="gray900" fontSize={40} textAlign="center">
                +
              </Text>
            </EmptyAttachmentItem>
          )}
        </ImageContainer>
      }
      {...props}
    />
  );
};

const ImageContainer = styled.View`
  flex-direction: row;
  gap: 20px;
`;

const AttachmentItemContainer = styled.View`
  position: relative;
`;

const AttachmentItem = styled.Image<{ uri?: string }>`
  width: 85px;
  height: 85px;
  border-radius: 8px;
  border-color: ${COLORS.gray500};
`;

const EmptyAttachmentItem = styled.TouchableOpacity`
  width: 85px;
  height: 85px;
  border-radius: 8px;
  background-color: white;
  border-width: 1px;
  border-color: ${COLORS.gray500};
  justify-content: center;
  align-items: center;
`;

const AttachmentItemDeleteButton = styled.TouchableOpacity`
  position: absolute;
  top: -4px;
  right: -4px;
  padding: 8px;
`;

export default ImageSelectField;
