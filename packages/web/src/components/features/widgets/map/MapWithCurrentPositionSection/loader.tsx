import Spinner from "@shared/ui/Spinner";

export default function MapWithCurrentPositionSectionLoader() {
  return (
    <div className="w-full h-full relative flex justify-center items-center">
      <div className="absolute inset-0 bg-main-green opacity-5 w-full h-full" />
      <Spinner size="md" />
    </div>
  );
}
