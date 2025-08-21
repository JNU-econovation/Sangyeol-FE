import Text from "@shared/ui/Text";
import LockIcon from "@icons/LockIcon";
import { useMemo } from "react";

interface MountainBgItemProps {
  region?: string;
  mountainName?: string;
  locked?: boolean;
}

export default function MountainBgItem({
  region,
  mountainName,
  locked = false,
}: MountainBgItemProps) {
  const BACKGROUND_IMAGE_URL = useMemo(
    () => `url('/images/Mountain_Background.png')`,
    []
  );

  return (
    <div
      className="w-full h-72 rounded-2xl flex items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: BACKGROUND_IMAGE_URL,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {!locked && (
        <>
          <div className="absolute top-0 right-0 bg-black opacity-40 w-full h-full" />
          <div className="absolute top-6 right-4">
            <Text
              fontSize="text-4xl"
              fontWeight="font-bold"
              color="text-white"
              zIndex="z-10"
            >
              {region}
            </Text>
          </div>
          <Text
            fontSize="text-4xl"
            fontWeight="font-bold"
            color="text-white"
            zIndex="z-10"
          >
            {mountainName}
          </Text>
        </>
      )}
      {locked && (
        <>
          <div className="z-10 absolute top-0 right-0 flex items-center justify-center w-full h-full">
            <LockIcon />
          </div>
          <div className="absolute top-0 right-0 bg-white opacity-40 w-full h-full" />
        </>
      )}
    </div>
  );
}
