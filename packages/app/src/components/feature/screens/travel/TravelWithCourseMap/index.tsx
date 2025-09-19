import styled from "@emotion/native";
import useBasesQuery from "@hooks/feature/query/query/useBasesQuery";
import useCoursePathwayQuery from "@hooks/feature/query/query/useCoursePathwayQuery";
import useFacilitiesQuery from "@hooks/feature/query/query/useFacilitiesQuery";
import { Coordinate } from "@model/map";
import MapHeaderNavbar from "@screens/map/MapHeaderNavbar";
import useTravelStateStore from "@store/travel";
import { COLORS } from "@styles/colorPalette";
import ConfigurableMapView from "@widget/ConfigurableMapView";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useMemo } from "react";

const mountainId = "1";

const TravelWithCourseMap = () => {
  const { courseId } = useLocalSearchParams<{ courseId: string }>();

  const {
    data: { facilities },
  } = useFacilitiesQuery({ mountainId });
  const {
    data: { bases },
  } = useBasesQuery({ mountainId });

  const { timelog, addTimelog, traveledPath } = useTravelStateStore();

  const traveledPaths = traveledPath.map(([longitude, latitude]) => ({
    latitude,
    longitude,
  }));

  const {
    data: { pathways },
  } = useCoursePathwayQuery({
    courseId,
  });

  const courses = useMemo(
    () =>
      pathways.flatMap(({ coordinates }) =>
        coordinates.map(([lng, lat]) => ({ latitude: lat, longitude: lng })),
      ),
    [pathways],
  );

  useEffect(() => {
    if (timelog.length === 0) addTimelog("start", Date.now());
  }, [addTimelog]);

  return (
    <Container>
      <MapHeaderNavbar>
        {({ selectedTags }) => (
          <ConfigurableMapView
            currentPositionIcon
            zoom={16}
            paths={[
              { coords: traveledPaths, color: COLORS.primary },
              { coords: courses, color: COLORS.gray700 },
            ]}
            showOverlays={selectedTags}
            bases={bases.map(({ coordinate }) => coordinate)}
            toilets={facilities
              .filter(({ facilityType }) => facilityType === "TOILET")
              .map(({ coordinate }) => coordinate as Coordinate)}
            markets={facilities
              .filter(({ facilityType }) => facilityType === "MARKET")
              .map(({ coordinate }) => coordinate as Coordinate)}
            rentals={facilities
              .filter(({ facilityType }) => facilityType === "RENTAL")
              .map(({ coordinate }) => coordinate as Coordinate)}
            emergencyKits={facilities
              .filter(({ facilityType }) => facilityType === "EMERGENCY_KIT")
              .map(({ coordinate }) => coordinate as Coordinate)}
          />
        )}
      </MapHeaderNavbar>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
`;

export default TravelWithCourseMap;
