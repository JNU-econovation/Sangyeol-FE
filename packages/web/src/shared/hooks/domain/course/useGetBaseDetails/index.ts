import useBasesDetailQuery from "@shared/api/suspenseQueries/useBasesDetailQuery";
import useBasesQuery from "@shared/api/suspenseQueries/useBasesQuery";

interface UseGetBaseDetailsProps {
  mountainId: string;
  baseId: string;
}

const useGetBaseDetails = ({ mountainId, baseId }: UseGetBaseDetailsProps) => {
  const {
    data: { baseDetails },
  } = useBasesDetailQuery({
    mountainId,
  });

  const {
    data: { bases },
  } = useBasesQuery({ mountainId });

  const indexOfBases = bases.findIndex((base) => +base.baseId === +baseId);
  const indexOfBaseDetails = baseDetails.findIndex(
    (detail) => +detail.baseId === +baseId,
  );

  if (indexOfBases === -1 || indexOfBaseDetails === -1)
    throw new Error("[useGetBaseDetails] 존재하지 않는 베이스입니다.");

  return { ...baseDetails?.[indexOfBaseDetails], ...bases[indexOfBases] };
};

export default useGetBaseDetails;
