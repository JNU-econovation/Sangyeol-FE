import PositionSelectField from "@entities/PositionSelectField";

interface PositionSelectFieldProps {
  title: string;
  titleSideButtonTitle: string;
}

const _FormPositionSelectField = (props: PositionSelectFieldProps) => {
  return <PositionSelectField {...props} />;
};

export default _FormPositionSelectField;
