import useProfileQuery from "@shared/api/suspenseQueries/useProfileQuery";
import TextField from "@shared/components/primitives/ui/TextField";

const NameField = () => {
  const {
    data: { name },
  } = useProfileQuery();
  return <TextField label="이름" value={name} disabled />;
};

export default NameField;
