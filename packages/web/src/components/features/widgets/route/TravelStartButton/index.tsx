"use client";

import useStartTravelBridge from "@hooks/feature/bridge/useStartTravelBridge";
import Button from "@shared/ui/Button";
import { useParams } from "next/navigation";

export default function TravelStartButton() {
  const { courseId } = useParams<{
    courseId: string;
  }>();

  const startTravel = useStartTravelBridge();

  return (
    <Button fullWidth onClick={() => startTravel(courseId)}>
      산행 시작
    </Button>
  );
}
