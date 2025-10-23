// services/locationService.ts
import { db } from "@db/client/travelPathLogClient";
import { travelPathLogTable } from "@db/schema/travelPathLogTable";

// 위치 저장
export async function saveLocation(lon: number, lat: number) {
  await db.insert(travelPathLogTable).values({
    coordinates: JSON.stringify([lon, lat]),
    timestamp: Date.now(),
  });
}

// 전체 경로를 좌표 배열로 반환 (오래된 것부터 -> 최신 순)
export async function getAllPathCoordinates(): Promise<[number, number][]> {
  const logs = await db
    .select()
    .from(travelPathLogTable)
    .orderBy(travelPathLogTable.timestamp); // 오름차순 정렬 (오래된 것이 먼저)

  return logs.map((log) => JSON.parse(log.coordinates) as [number, number]);
}

// 모든 데이터 삭제 (테스트용)
export async function clearAllLocations() {
  await db.delete(travelPathLogTable);
}
