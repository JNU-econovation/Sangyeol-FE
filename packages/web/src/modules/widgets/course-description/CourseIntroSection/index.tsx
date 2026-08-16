const CourseIntroSection = () => {
  return (
    <section className="flex w-full flex-col gap-1.5">
      <span className="text-xs font-semibold text-primary">코스 소개</span>

      <h3 className="text-lg leading-[1.35] font-bold text-black-900">
        가볍게 시작하기 좋은 무등산 대표 코스
      </h3>

      <p className="text-sm leading-[1.6] text-black-800">
        비교적 완만한 숲길을 따라 당산나무를 지나 정상으로 오르는 코스예요.
        처음 방문하는 분께도 적합해요.
      </p>
    </section>
  );
};

export default CourseIntroSection;
