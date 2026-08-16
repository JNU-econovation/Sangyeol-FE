"use client";

import MAP from "@shared/constants/map";
import type { Markers } from "@shared/types/map";
import { getFacilitiesByFacilityType } from "@shared/utils/map";
import MapView from "@shared/components/composites/MapView";
import useDrawMarkers from "@shared/hooks/domain/map/useDrawMarkers";
import useBasesQuery from "@shared/api/suspenseQueries/useBasesQuery";
import useFacilitiesQuery from "@shared/api/suspenseQueries/useFacilitiesQuery";
import { Suspense } from "@suspensive/react";
import { useParams, useSearchParams } from "next/navigation";
import { useMemo } from "react";

import MapWithCurrentPositionSectionLoader from "./components/loader";

// 대부분의 지도에서 사용하는 기능이 모두 있는 컴포넌트입니다.
// 현재 위치 마크, 마커 표시
// 만약 경로와 함께 표시하고 싶다면 MapWithHeaderAndPathSection를 사용하세요.

export default Suspense.with(
  {
    fallback: <MapWithCurrentPositionSectionLoader />,
    name: "MapWithCurrentPositionSection",
    clientOnly: true,
  },
  () => {
    const params = useParams<{
      mountainId: string;
      // courseId: string;
    }>();
    const searchParams = useSearchParams();

    const { mountainId } = params;
    const selectedTagId =
      (searchParams.get("tag") as keyof typeof MAP.BASE_AND_FACILITY) ||
      MAP.BASE.id;

    const { data: facilitiesData } = useFacilitiesQuery({ mountainId });
    const { data: basesData } = useBasesQuery({ mountainId });

    const { facilities } = facilitiesData;
    const { bases } = basesData;

    const markers: Markers[] = useMemo(() => {
      if (selectedTagId === MAP.BASE.id) {
        return bases.map(({ baseId, coordinate, name }) => ({
          id: baseId,
          name: name,
          coordinate,
          type: MAP.BASE.id,
        }));
      }
      return getFacilitiesByFacilityType(facilities, selectedTagId).map(
        ({ coordinate, facilityId, facilityName, facilityType }) => ({
          id: facilityId,
          name: facilityName,
          coordinate,
          type: facilityType,
        }),
      );
    }, [facilities, bases, selectedTagId]);

    return (
      <div className="absolute top-0 left-0 w-full h-full">
        <MapView currentPositionIcon={true} zoom={13}>
          {({ map }) => {
            useDrawMarkers({
              map,
              markers: markers ?? [],
              enable: (markers ?? []).length > 0,
            });
            return null;
          }}
        </MapView>
      </div>
    );
  },
);
