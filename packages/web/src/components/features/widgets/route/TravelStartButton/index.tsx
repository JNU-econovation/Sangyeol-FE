"use client";

import useStartTravelBridge from "@hooks/feature/bridge/useStartTravelBridge";
import Button from "@shared/ui/Button";
import { useParams } from "next/navigation";

export default function TravelStartButton() {
  const { courseId, mountainId } = useParams<{
    courseId: string;
    mountainId: string;
  }>();

  const startTravel = useStartTravelBridge();

  return (
    <Button fullWidth onClick={() => startTravel({ courseId, mountainId })}>
      산행 시작
    </Button>
  );
}
