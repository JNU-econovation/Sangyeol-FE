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
import { useMemo } from "react";

const mountainId = "1";

const TravelWithCourseMap = () => {
  const { courseId } = useLocalSearchParams<{ courseId: string }>();

  const {
    data: { facilities },
  } = useFacilitiesQuery({ mountainId });
  const {
    data: { bases },
  } = useBasesQuery({ mountainId });

  const traveledPath = useTravelStateStore().traveledPath.map(
    ([longitude, latitude]) => ({ latitude, longitude }),
  );

  const {
    data: { pathways },
  } = useCoursePathwayQuery({
    courseId,
  });

  const courses = useMemo(() => {
    return pathways
      .map(({ coordinates }) => {
        return coordinates.map((coord) => {
          return { latitude: coord[1], longitude: coord[0] };
        });
      })
      .flat() as unknown as { latitude: number; longitude: number }[];
  }, [pathways]);

  return (
    <Container>
      <MapHeaderNavbar>
        {({ selectedTags }) => (
          <ConfigurableMapView
            paths={[
              { coords: traveledPath, color: COLORS.primary },
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
