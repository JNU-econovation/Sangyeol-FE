import styled from "@emotion/native";

interface TextAreaFieldLoaderProps {
  titleWidth?: number;
  helperTextWidth?: number;
  textareaHeight?: number;
  rows?: number;
}

/**
 * TextAreaField 컴포넌트의 스켈레톤 UI
 */
const TextAreaFieldLoader = ({
  titleWidth = 120,
  helperTextWidth = 200,
  textareaHeight,
  rows = 1,
}: TextAreaFieldLoaderProps) => {
  const calculatedHeight = textareaHeight || 24 + (rows - 1) * 20;
  return (
    <Container>
      <TitleSkeleton width={titleWidth} />
      <TextareaSkeleton height={calculatedHeight} />
      <HelperTextSkeleton width={helperTextWidth} />
    </Container>
  );
};

const Container = styled.View``;

const SkeletonBase = styled.View`
  background-color: #f0f0f0;
`;

const TitleSkeleton = styled(SkeletonBase)<{ width: number }>`
  width: ${(props) => props.width}px;
  height: 20px;
  border-radius: 4px;
  margin-bottom: 14px;
`;

const TextareaSkeleton = styled(SkeletonBase)<{ height: number }>`
  width: 100%;
  height: ${(props) => props.height}px;
  border-radius: 8px;
  margin-bottom: 4px;
`;

const HelperTextSkeleton = styled(SkeletonBase)<{ width: number }>`
  width: ${(props) => props.width}px;
  height: 16px;
  border-radius: 4px;
`;

export default TextAreaFieldLoader;
