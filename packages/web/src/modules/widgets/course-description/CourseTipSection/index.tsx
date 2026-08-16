import FootprintsIcon from "@icons/FootprintsIcon";

const CourseTipSection = () => {
  return (
    <section className="flex w-full flex-col gap-2.5 rounded-[15px] border border-green-700 bg-green-600 p-4">
      <div className="flex items-center gap-2">
        <FootprintsIcon size={18} className="shrink-0 text-primary" />
        <h3 className="text-sm font-bold text-primary">코스 TIP</h3>
      </div>

      <p className="text-xs leading-[1.6] text-black-800">
        당산나무 이후에는 미끄러운 구간이 있어요. 등산화와 스틱을 권장하고,
        우천 시 주의하세요.
      </p>

      <span className="text-[10px] text-gray-900">
        출처 · 국립공원공단 · 한국산림복지진흥원
      </span>
    </section>
  );
};

export default CourseTipSection;
