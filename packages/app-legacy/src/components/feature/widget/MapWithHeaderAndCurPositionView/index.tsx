import styled from "@emotion/native";
import useBasesQuery from "@hooks/feature/query/query/useBasesQuery";
import useFacilitiesQuery from "@hooks/feature/query/query/useFacilitiesQuery";
import { Coordinate } from "@model/map";
import MapHeaderNavbar from "@screens/map/MapHeaderNavbar";
import ConfigurableMapView from "@widget/ConfigurableMapView";

const MapWithHeaderAndCurPositionView = () => {
  const mountainId = "1";

  const {
    data: { facilities },
  } = useFacilitiesQuery({ mountainId });
  const {
    data: { bases },
  } = useBasesQuery({ mountainId });

  return (
    <Container>
      <MapHeaderNavbar>
        {({ selectedTags }) => (
          <ConfigurableMapView
            currentPositionIcon
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

export default MapWithHeaderAndCurPositionView;
