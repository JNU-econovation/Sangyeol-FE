import useProfileQuery from "@hooks/feature/query/query/useProfileQuery";
import TextField from "@shared/ui/TextField";

const NameField = () => {
  const {
    data: { name },
  } = useProfileQuery();
  return <TextField label="이름" value={name} disabled />;
};

export default NameField;
