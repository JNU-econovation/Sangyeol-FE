import useGetCurrentPosition from "@hooks/feature/useGetCurrentPosition";
import FieldLayout from "@shared/layout/FieldLayout";
import Textarea from "@shared/ui/Textarea";
import WeakButton from "@shared/ui/WeakButton";
import { useReportPositionStore } from "@store/report/useReportPositionStore";
import { convertToDMS } from "@utils/coords";
import { router } from "expo-router";

interface PositionSelectFieldProps {
  title: string;
  titleSideButtonTitle: string;
}

const PositionSelectField = ({
  title,
  titleSideButtonTitle,
}: PositionSelectFieldProps) => {
  const { reportPosition, setReportPosition } = useReportPositionStore();
  const { location, isLoading } = useGetCurrentPosition();

  if (!location || isLoading) {
    return null;
  }
  const {
    coords: { latitude, longitude },
  } = location;

  // if (!reportPosition) {
  //   setReportPosition({ latitude, longitude });
  //   return null;
  // }

  const lat = reportPosition?.latitude || latitude;
  const lng = reportPosition?.longitude || longitude;

  return (
    <FieldLayout
      title={title}
      titleSideComponent={
        <WeakButton
          title={titleSideButtonTitle}
          onPress={() => {
            router.push("/report/checkPosition");
          }}
        />
      }
      content={
        <Textarea
          value={`위도 ${convertToDMS(lat, lng).split(", ")[0]} 경도 ${convertToDMS(lat, lng).split(", ")[1]}`}
          editable={false}
          backgroundColor="subGray"
        />
      }
    />
  );
};

export default PositionSelectField;
