"use client";

import MAP from "@/constants/map";
import MOUNTAIN from "@/constants/mountain/index";
import type { Markers } from "@/types/map";
import { getFacilitiesByFacilityType } from "@/utils/map";
import MapView from "@entities/MapView";
import useGetCoursePathByCourseId from "@hooks/feature/course/useGetCoursePath";
import useDrawMarkers from "@hooks/feature/map/useDrawMarkers";
import useBasesQuery from "@hooks/feature/query/query/useBasesQuery";
import useFacilitiesQuery from "@hooks/feature/query/query/useFacilitiesQuery";
import Spinner from "@shared/ui/Spinner";
import { Suspense } from "@suspensive/react";
import { useParams, useSearchParams } from "next/navigation";
import { useMemo } from "react";

export default Suspense.with(
  {
    fallback: (
      <div className="w-full h-full relative flex justify-center items-center">
        <div className="absolute inset-0 bg-primary opacity-5 animate-ping w-full h-full" />
        <Spinner size="md" />
      </div>
    ),
    name: "MapWithHeaderAndPathSection",
    clientOnly: true,
  },
  () => {
    const params = useParams<{
      mountainId: string;
      courseId: string;
    }>();
    const searchParams = useSearchParams();

    const { mountainId, courseId } = params;

    const selectedTagIds = useMemo(() => {
      const raw = searchParams.getAll("tag");
      const allowed = new Set<string>([
        MAP.BASE.id,
        ...Object.keys(MAP.BASE_AND_FACILITY),
      ]);
      return Array.from(new Set(raw.filter((t) => allowed.has(t)))) as (
        | keyof typeof MAP.BASE_AND_FACILITY
        | typeof MAP.BASE.id
      )[];
    }, [searchParams]);

    const { data: facilitiesData } = useFacilitiesQuery({ mountainId });
    const { data: basesData } = useBasesQuery({ mountainId });

    const coursePath = useGetCoursePathByCourseId({ courseId });

    const { facilities } = facilitiesData;
    const { bases } = basesData;

    const markers: Markers[] = useMemo(() => {
      const result = [];
      selectedTagIds.forEach((selectedTagId) => {
        if (selectedTagId === MAP.BASE.id) {
          result.push(
            ...bases.map(({ baseId, coordinate, name }) => ({
              id: baseId,
              name: name,
              coordinate,
              type: MAP.BASE.id,
            })),
          );
        }
        result.push(
          ...getFacilitiesByFacilityType(facilities, selectedTagId).map(
            ({ coordinate, facilityId, facilityName, facilityType }) => ({
              id: facilityId,
              type: facilityType,
              name: facilityName,
              coordinate,
            }),
          ),
        );
      });
      return result;
    }, [facilities, bases, selectedTagIds]);

    return (
      <div className="absolute top-0 left-0 w-full h-full">
        <MapView
          paths={[{ path: coursePath }]}
          currentPositionIcon={true}
          zoom={12}
          initPosition={{
            //TODO: 단정 대신 추론으로 사용하기
            longitude:
              MOUNTAIN[mountainId]?.coordinate[0] ??
              MOUNTAIN.default.coordinate[0],
            latitude:
              MOUNTAIN[mountainId]?.coordinate[1] ??
              MOUNTAIN.default.coordinate[1],
          }}
        >
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
