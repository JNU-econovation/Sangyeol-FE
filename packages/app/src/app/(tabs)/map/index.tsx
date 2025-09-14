import styled from "@emotion/native";
import MapWithHeaderAndCurPositionView from "@widget/MapWithHeaderAndCurPositionView";

const MapScreen = () => {
  return (
    <Container>
      <MapWithHeaderAndCurPositionView />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  position: relative;
`;

export default MapScreen;
