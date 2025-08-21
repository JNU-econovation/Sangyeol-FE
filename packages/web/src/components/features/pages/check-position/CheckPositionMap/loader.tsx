export default function CheckPositionMapLoader() {
  return (
    <div>
      <div className="w-screen h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full border-b-2 border-r-2 border-main-green" />
        <span className="ml-4 text-gray-20 text-xl">지도 불러오는 중...</span>
      </div>
    </div>
  );
}
