import { TrashSVG } from "@components/common/shared/ui/Icons";
import Text from "@components/common/shared/ui/Text";
import styled from "@emotion/native";
import useImagePicker from "@hooks/common/useImagePicker";
import FieldLayout, { FieldLayoutProps } from "@shared/layout/FieldLayout";
import WeakButton from "@shared/ui/WeakButton";
import { COLORS } from "@styles/colorPalette";

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
                  <TrashSVG />
                </AttachmentItemDeleteButton>
              </AttachmentItemContainer>
            ))}
          {(!selectedImagesUri || selectedImagesUri?.length < 3) && (
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
  background-color: #f0f0f0;
`;

const EmptyAttachmentItem = styled.TouchableOpacity`
  width: 85px;
  height: 85px;
  border-radius: 8px;
  background-color: ${COLORS.gray300};
  justify-content: center;
  align-items: center;
`;

const AttachmentItemDeleteButton = styled.TouchableOpacity`
  position: absolute;
  top: 2px;
  right: 2px;
  padding: 8px;
`;

export default ImageSelectField;
