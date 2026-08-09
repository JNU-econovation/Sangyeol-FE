"use client";

import MapHeaderNavbar from "@shared/components/composites/MapHeaderNavbar";
import MapView from "@shared/components/composites/MapView";
import TravelMapBridgeListener from "@modules/widgets/travel/TravelMapBridgeListener";
import Spacing from "@shared/components/primitives/layout/Spacing";
import { Suspense } from "@suspensive/react";

export default Suspense.with(
  {
    fallback: (
      <div className="absolute top-0 left-0 w-screen h-screen bg-primary opacity-10" />
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
  },
);
