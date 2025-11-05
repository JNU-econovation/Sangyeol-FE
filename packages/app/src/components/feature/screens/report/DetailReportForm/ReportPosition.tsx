import PositionSelectField from "@entities/PositionSelectField";
import { useDetailReportFormContext } from "@hooks/feature/form/useDetailReportForm";
import * as Location from "expo-location";
import { memo, useEffect, useRef } from "react";

const ReportPosition = memo(() => {
  const { setValue } = useDetailReportFormContext();
  const currentPositionRef = useRef<{ lat: number; lng: number } | null>(null);

  // 현재 위치로 초기 설정
  useEffect(() => {
    (async () => {
      try {
        const { coords } = await Location.getCurrentPositionAsync({});
        setValue("reportLocation", {
          latitude: coords.latitude,
          longitude: coords.longitude,
        });
      } catch (error) {
        console.log("위치 정보를 가져오지 못했습니다.", error);
      }
    })();
  }, [setValue]);

  useEffect(() => {
    if (currentPositionRef.current) {
      const { lat, lng } = currentPositionRef.current;
      setValue("reportLocation", { latitude: lat, longitude: lng });
    }
  }, [
    currentPositionRef.current?.lat,
    currentPositionRef.current?.lng,
    setValue,
  ]);

  return (
    <PositionSelectField
      title="현재 위치"
      titleSideButtonTitle="현재 위치 +"
      titleWeight="bold"
    >
      {({ latitude, longitude }) => {
        currentPositionRef.current = { lat: latitude, lng: longitude };
        return null;
      }}
    </PositionSelectField>
  );
});

export default ReportPosition;
