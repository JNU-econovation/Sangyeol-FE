import FieldLayout from "@components/common/shared/layout/FieldLayout";
import Textarea from "@components/common/shared/ui/Textarea";
import WeakButton from "@components/common/shared/ui/WeakButton";
import { useDetailReportFormContext } from "@hooks/feature/form/useDetailReportForm";
import { useReportPositionStore } from "@store/report/useReportPositionStore";
import { convertToDMS } from "@utils/coords";
import * as Location from "expo-location";
import { router } from "expo-router";
import { memo, useEffect } from "react";

const ReportPosition = memo(() => {
  const { reportPosition, setReportPosition } = useReportPositionStore(); // 위치 설정 페이지에서 초기 위치 & 변경될 위치 데이터
  const { setValue, watch } = useDetailReportFormContext();

  // 현재 위치로 초기 설정
  useEffect(() => {
    (async () => {
      try {
        const { coords } = await Location.getCurrentPositionAsync({});
        setValue("reportLocation", {
          latitude: coords.latitude,
          longitude: coords.longitude,
        });
        setReportPosition({
          latitude: coords.latitude,
          longitude: coords.longitude,
        });
      } catch (error) {
        console.log("위치 정보를 가져오지 못했습니다.", error);
      }
    })();
  }, [setValue]);

  useEffect(() => {
    if (
      reportPosition &&
      reportPosition.latitude !== watch("reportLocation")?.latitude &&
      reportPosition.longitude !== watch("reportLocation")?.longitude
    ) {
      setValue("reportLocation", {
        latitude: reportPosition.latitude,
        longitude: reportPosition.longitude,
      });
    }
  }, [reportPosition, setValue]);

  const lat = watch("reportLocation")?.latitude || 0;
  const lng = watch("reportLocation")?.longitude || 0;

  return (
    <FieldLayout
      title="현재 위치"
      titleSideComponent={
        <WeakButton
          title="현재 위치 +"
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
    />
  );
});

export default ReportPosition;
