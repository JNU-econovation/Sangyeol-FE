import styled from "@emotion/native";
import useBasesQuery from "@hooks/feature/query/query/useBasesQuery";
import useFacilitiesQuery from "@hooks/feature/query/query/useFacilitiesQuery";
import { Coordinate } from "@model/map";
import MapHeaderNavbar from "@screens/map/MapHeaderNavbar";
import useTravelStateStore from "@store/travel";
import { COLORS } from "@styles/colorPalette";
import ConfigurableMapView from "@widget/ConfigurableMapView";

const mountainId = "1";

const TravelWithoutCourseMap = () => {
  const {
    data: { facilities },
  } = useFacilitiesQuery({ mountainId });
  const {
    data: { bases },
  } = useBasesQuery({ mountainId });

  const traveledPath = useTravelStateStore().traveledPath.map(
    ([longitude, latitude]) => ({ latitude, longitude }),
  );

  return (
    <Container>
      <MapHeaderNavbar>
        {({ selectedTags }) => (
          <ConfigurableMapView
            paths={[{ coords: traveledPath, color: COLORS.primary }]}
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

export default TravelWithoutCourseMap;
