"use client";

import MapHeaderNavbar from "@entities/MapHeaderNavbar";
import MapView from "@entities/MapView";
import TravelMapBridgeListener from "@pages/travel/TravelMapBridgeListener";
import Spacing from "@shared/layout/Spacing";
import { Suspense } from "@suspensive/react";

export default Suspense.with(
  {
    fallback: (
      <div className="absolute top-0 left-0 w-screen h-screen bg-main-green opacity-10" />
    ),
    name: "TravelMapSection",
    clientOnly: true,
  },
  function TravelMapSection() {
    return (
      <TravelMapBridgeListener>
        {({ paths }) => (
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="z-10 fixed px-6">
              <Spacing size={12} />
              <MapHeaderNavbar />
            </div>
            <MapView
              currentPositionIcon={true}
              zoom={17}
              paths={paths}
              getCurrentPositionInterval={200}
            >
              {/* {({ map }) => {
            useDrawMarkers({
              map,
              markers: markers ?? [],
              enable: (markers ?? []).length > 0,
              });
              return null;
              }} */}
            </MapView>
          </div>
        )}
      </TravelMapBridgeListener>
    );
  }
);
