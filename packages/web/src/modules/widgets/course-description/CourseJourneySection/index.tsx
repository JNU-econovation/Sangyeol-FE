import JourneyStepItem, {
  type JourneyStepItemProps,
} from "./components/JourneyStepItem";

const JOURNEY_STEPS: Omit<JourneyStepItemProps, "order">[] = [
  {
    title: "증심사 주차장",
    description:
      "증심사 주차장에서 출발해 증심교와 증심사를 지나 당산나무 방향으로 이동해요.",
    imageSrc: "/images/courses/step-jeungsimsa-gate-upright.jpg",
  },
  {
    title: "당산나무 · 1.3km · 약 46분",
    description:
      "완만한 숲길을 지나 만나는 수령 500년이 넘는 느티나무로, 광주광역시 보호수로 지정돼 있어요.",
    imageSrc: "/images/courses/step-dangsan-tree.jpg",
  },
  {
    title: "중머리재 · 1.4km · 약 58분",
    description:
      "당산나무 이후부터 돌과 계단, 바위가 섞여 있어요. 넓은 평원으로 유명한 중머리재에 도착해요.",
    imageSrc: "/images/courses/step-jungmeorijae.jpg",
  },
];

const CourseJourneySection = () => {
  return (
    <section className="flex w-full flex-col gap-5">
      <h3 className="text-base font-bold text-black-900">코스 여정</h3>

      <ol className="flex w-full flex-col gap-5">
        {JOURNEY_STEPS.map((step, index) => (
          <JourneyStepItem key={step.title} order={index + 1} {...step} />
        ))}
      </ol>
    </section>
  );
};

export default CourseJourneySection;
