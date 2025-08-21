import MAP from "@/constants/map";

export type Coordinate = [number, number];

export interface FacilityMarker {
  facilityId: string;
  facilityType: keyof typeof MAP.FACILITY_TYPES;
  facilityName: string;
  coordinate: Coordinate;
}

export interface BaseMarker {
  baseId: string;
  name: string;
  coordinate: Coordinate;
}

// 통용되는 마커 타입
export interface Markers {
  id: string;
  name: string;
  coordinate: Coordinate;
  type: keyof typeof MAP.FACILITY_TYPES | typeof MAP.BASE.id;
}
