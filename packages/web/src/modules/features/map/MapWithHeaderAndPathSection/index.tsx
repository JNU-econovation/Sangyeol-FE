"use client";

// import MAP from "@shared/constants/map";
import MOUNTAIN from "@shared/constants/mountain/index";
import type { Markers } from "@shared/types/map";
// import { getFacilitiesByFacilityType } from "@shared/utils/map";
import MapView from "@shared/components/composites/MapView";
// import useGetCoursePathByCourseId from "@shared/hooks/domain/course/useGetCoursePath";
import useDrawMarkers from "@shared/hooks/domain/map/useDrawMarkers";
// import useBasesQuery from "@shared/api/suspenseQueries/useBasesQuery";
// import useFacilitiesQuery from "@shared/api/suspenseQueries/useFacilitiesQuery";
import Spinner from "@shared/components/primitives/ui/Spinner";
import { Suspense } from "@suspensive/react";
// import { useParams, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { getCoursePathByCourseId, getFacilities } from "@/shared/api/proto";
import useCourseInfo from "./useCourseInfo";
import useSelectedTag from "./useSelectedTag";

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
    const { courseId } = useCourseInfo();
    const { selectedTagIds } = useSelectedTag();

    const {
      bases,
      emergencyKits,
      markets,
      rentals,
      // shelters,
      toilets,
    } = getFacilities();

    // const coursePath = useGetCoursePathByCourseId({ courseId });
    const coursePath = getCoursePathByCourseId(courseId);

    const markers: Markers[] = useMemo(() => {
      const baseMarkers: Markers[] = bases.map(
        ({ latitude, longitude, name }) => {
          return {
            coordinate: [longitude, latitude],
            id: name,
            name: name,
            type: "BASE",
          };
        },
      );
      const emergencyKitsMarkers: Markers[] = emergencyKits.map(
        ({ latitude, longitude, name }) => {
          return {
            coordinate: [longitude, latitude],
            id: name,
            name: name,
            type: "EMERGENCY_KIT",
          };
        },
      );
      const marketsMarkers: Markers[] = markets.map(
        ({ latitude, longitude, name }) => {
          return {
            coordinate: [longitude, latitude],
            id: name,
            name: name,
            type: "MARKET",
          };
        },
      );
      const rentalsMarkers: Markers[] = rentals.map(
        ({ latitude, longitude, name }) => {
          return {
            coordinate: [longitude, latitude],
            id: name,
            name: name,
            type: "RENTAL",
          };
        },
      );
      // const sheltersMarkers: Markers[] = shelters.map(
      //   ({ latitude, longitude, name }) => {
      //     return {
      //       coordinate: [longitude, latitude],
      //       id: name,
      //       name: name,
      //       type: "SHELTER",
      //     };
      //   },
      // );
      const sheltersMarkers: Markers[] = [];
      const toiletsMarkers: Markers[] = toilets.map(
        ({ latitude, longitude, name }) => {
          return {
            coordinate: [longitude, latitude],
            id: name,
            name: name,
            type: "TOILET",
          };
        },
      );
      const markers = [
        ...baseMarkers,
        ...emergencyKitsMarkers,
        ...marketsMarkers,
        ...rentalsMarkers,
        ...sheltersMarkers,
        ...toiletsMarkers,
      ];

      return markers.filter((marker) => selectedTagIds.includes(marker.type));
    }, [bases, emergencyKits, markets, rentals, toilets, selectedTagIds]);

    return (
      <div className="absolute top-0 left-0 w-full h-full">
        <MapView
          paths={[{ path: coursePath }]}
          currentPositionIcon={true}
          zoom={12}
          initPosition={{
            //TODO: 우선 무등산 좌표로 고정, 추후 courseId에 따라 산 좌표로 변경
            longitude:
              MOUNTAIN["1"]?.coordinate[0] ?? MOUNTAIN.default.coordinate[0],
            latitude:
              MOUNTAIN["1"]?.coordinate[1] ?? MOUNTAIN.default.coordinate[1],
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
