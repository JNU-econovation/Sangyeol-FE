import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4 w-4/5 mx-auto">
      <div className="border border-gray-300 rounded-lg p-4 hover:bg-gray-100 transition-colors w-full">
        <Link href="/mountain">
          <h2 className="text-2xl font-bold text-center">코스 검색</h2>
        </Link>
      </div>
      {/* <Link href="/travel">산행 시작</Link> */}
      <div className="border border-gray-300 rounded-lg p-4 hover:bg-gray-100 transition-colors w-full">
        <Link href="/travel">
          <h2 className="text-2xl font-bold text-center">산행 시작</h2>
        </Link>
      </div>
      <div className="border border-gray-300 rounded-lg p-4 hover:bg-gray-100 transition-colors w-full">
        <Link href="/map">
          <h2 className="text-2xl font-bold text-center">지도</h2>
        </Link>
      </div>
    </div>
  );
}
