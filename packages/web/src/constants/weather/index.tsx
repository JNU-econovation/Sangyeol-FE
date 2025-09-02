import ClearIcon from "@icons/ClearIcon";
import CloudsIcon from "@icons/CloudsIcon";
import DrizzleIcon from "@icons/DrizzleIcon";
import MistIcon from "@icons/MistIcon";
import RainIcon from "@icons/RainIcon";
import SnowIcon from "@icons/SnowIcon";
import ThunderstormIcon from "@icons/ThunderstormIcon";

const WEATHER = {
  Thunderstorm: { name: "천둥번개", icon: <ThunderstormIcon /> },
  Drizzle: { name: "이슬비", icon: <DrizzleIcon /> },
  Rain: { name: "비", icon: <RainIcon /> },
  Snow: { name: "눈", icon: <SnowIcon /> },
  Mist: { name: "안개", icon: <MistIcon /> },
  Clear: { name: "맑음", icon: <ClearIcon /> },
  Clouds: { name: "구름", icon: <CloudsIcon /> },
} as const;

export default WEATHER;
