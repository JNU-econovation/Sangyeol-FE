import { Rounded_X } from "@components/common/shared/ui/Icons";
import Text from "@components/common/shared/ui/Text";
import styled from "@emotion/native";
import useImagePicker from "@hooks/common/useImagePicker";
import FieldLayout, { FieldLayoutProps } from "@shared/layout/FieldLayout";
import WeakButton from "@shared/ui/WeakButton";
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
  titleButton = false,
  buttonTitle,
  onChange,
  ...props
}: ImageSelectFieldProps) => {
  const { selectedImagesUri, pickImage, removeImage } = useImagePicker({
    onChange,
  });

  return (
    <FieldLayout
      title={title}
      titleSideComponent={
        titleButton && <WeakButton title={buttonTitle} onPress={pickImage} />
      }
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
            <EmptyAttachmentItem onPress={pickImage}>
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
