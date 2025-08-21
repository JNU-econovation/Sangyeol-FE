import Spinner from "@shared/ui/Spinner";

export default function KakaoLoginSectionLoader() {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full border-b-2 border-r-2 border-main-green" />
      <Spinner size={"sm"} />
      <span className="ml-4 text-gray-20 text-xl">
        카카오 로그인 페이지로 이동중...
      </span>
    </div>
  );
}
