export interface JourneyStepItemProps {
  order: number;
  title: string;
  description: string;
  imageSrc: string;
}

const JourneyStepItem = ({
  order,
  title,
  description,
  imageSrc,
}: JourneyStepItemProps) => {
  return (
    <li className="flex w-full gap-3">
      <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary">
        <span className="text-sm font-bold text-main-white">{order}</span>
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <h4 className="text-base font-bold text-black-900">{title}</h4>

        <p className="text-xs leading-[1.55] text-black-800">{description}</p>

        <img
          src={imageSrc}
          alt={title}
          loading="lazy"
          className="h-24 w-full rounded-[10px] object-cover"
        />
      </div>
    </li>
  );
};

export default JourneyStepItem;
