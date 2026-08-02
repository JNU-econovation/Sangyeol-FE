import styled from "@emotion/native";
import useBasesQuery from "@hooks/feature/query/query/useBasesQuery";
import useFacilitiesQuery from "@hooks/feature/query/query/useFacilitiesQuery";
// import useTravelWithoutCourse from "@hooks/feature/travel/useTravelWithoutCourse";
import { Coordinate } from "@model/map";
import MapHeaderNavbar from "@screens/map/MapHeaderNavbar";
import useTravelStateStore from "@store/travel";
import { COLORS } from "@styles/colorPalette";
import { Suspense } from "@suspensive/react";
import ConfigurableMapView from "@widget/ConfigurableMapView";
import { useEffect } from "react";

const mountainId = "1";

const TravelWithoutCourseMap = Suspense.with(
  {
    fallback: null,
    name: "TravelWithoutCourseMap",
  },
  () => {
    const {
      data: { facilities },
    } = useFacilitiesQuery({ mountainId });
    const {
      data: { bases },
    } = useBasesQuery({ mountainId });

    const { addTimelog, traveledPath, timelog } = useTravelStateStore();

    const traveledPaths = traveledPath.map(([longitude, latitude]) => ({
      latitude,
      longitude,
    }));

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
                { coords: traveledPaths, color: COLORS.primary, width: 6 },
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
  },
);

const Container = styled.View`
  flex: 1;
`;

export default TravelWithoutCourseMap;
