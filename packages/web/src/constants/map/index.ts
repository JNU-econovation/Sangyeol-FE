const FACILITY_TYPES = {
  TOILET: {
    id: "TOILET",
    facilityName: "화장실",
  },
  MARKET: {
    id: "MARKET",
    facilityName: "매장",
  },
  RENTAL: {
    id: "RENTAL",
    facilityName: "대여 서비스",
  },
  EMERGENCY_KIT: {
    id: "EMERGENCY_KIT",
    facilityName: "응급키트",
  },
} as const;

const BASE = {
  id: "BASE",
  facilityName: "거점",
} as const;

const BASE_AND_FACILITY = Object.assign({}, { BASE: BASE }, FACILITY_TYPES);

const MAP = Object.freeze({
  FACILITY_TYPES,
  BASE,
  BASE_AND_FACILITY,
});

export default MAP;
