import FieldLayout from "@shared/layout/FieldLayout";
import Spacing from "@shared/layout/Spacing";
import Text from "@shared/ui/Text";
import Textarea from "@shared/ui/Textarea";

import TextAreaFieldLoader from "./loader";

interface TextAreaFieldProps extends React.ComponentProps<typeof Textarea> {
  title: string;
  titleSpacing?: number;
  helperText?: string;
  helperTextSpacing?: number;
  helperTextProps?: React.ComponentProps<typeof Text>;
  titleSideComponent?: React.ReactNode;
  contentRightComponent?: React.ReactNode;
  contentLeftComponent?: React.ReactNode;
}

/**
 * 서비스에서 사용되는 모든 TextAreaField의 공통 UI 를 정의합니다.
 * 사용시 도메인에 맞는 로직이 들어간 새로운 컴포넌트로 만들어서 사용하면 됩니다.
 */
const TextAreaField = ({
  title,
  titleSpacing = 14,
  helperText,
  helperTextSpacing = 4,
  helperTextProps,
  titleSideComponent,
  contentRightComponent,
  contentLeftComponent,
  ...props
}: TextAreaFieldProps) => {
  return (
    <>
      <FieldLayout
        title={title}
        titleSideComponent={titleSideComponent}
        content={
          <>
            <Spacing size={titleSpacing} />
            <Textarea {...props} />
          </>
        }
        contentRightComponent={contentRightComponent}
        contentLeftComponent={contentLeftComponent}
      />
      {helperText && (
        <>
          <Spacing size={helperTextSpacing} />
          <Text {...helperTextProps}>{helperText}</Text>
        </>
      )}
    </>
  );
};

export default Object.assign(TextAreaField, {
  loader: TextAreaFieldLoader,
});
