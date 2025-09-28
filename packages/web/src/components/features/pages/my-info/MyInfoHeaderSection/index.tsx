import WeekHeader from "@entities/WeekHeader";

export default function MyInfoHeaderSection() {
  return (
    <>
      <WeekHeader headerText="내 정보 관리" />
      <hr className="w-full mx-auto text-gray-300" />
    </>
  );
}
