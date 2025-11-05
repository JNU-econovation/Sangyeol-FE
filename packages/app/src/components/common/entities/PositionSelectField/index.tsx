import useGetCurrentPosition from "@hooks/feature/location/useGetCurrentPosition";
import FieldLayout, { FieldLayoutProps } from "@shared/layout/FieldLayout";
import Textarea from "@shared/ui/Textarea";
import WeakButton from "@shared/ui/WeakButton";
import { useReportPositionStore } from "@store/report/useReportPositionStore";
import { convertToDMS } from "@utils/coords";
import { router } from "expo-router";
import { memo } from "react";

interface PositionSelectFieldProps extends Omit<FieldLayoutProps, "content"> {
  title: string;
  titleSideButtonTitle: string;
  children?: ({
    latitude,
    longitude,
  }: {
    latitude: number;
    longitude: number;
  }) => React.ReactNode;
}

//TODO: 사이드 이팩트가 있으므로 수정 필요 (지도로 이동 및 전역 상태 변경)

const PositionSelectField = memo(
  ({
    title,
    titleSideButtonTitle,
    children,
    ...props
  }: PositionSelectFieldProps) => {
    const { reportPosition } = useReportPositionStore();
    const { location, isLoading } = useGetCurrentPosition();

    if (!location || isLoading) {
      return null;
    }

    const {
      coords: { latitude, longitude },
    } = location;

    const lat = reportPosition?.latitude || latitude;
    const lng = reportPosition?.longitude || longitude;

    return (
      <>
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
              backgroundColor="gray300"
              borderColor="gray300"
            />
          }
          {...props}
        />
        {children?.({ latitude: lat, longitude: lng })}
      </>
    );
  },
);

export default PositionSelectField;
