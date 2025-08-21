import BackButton from "@widgets/route/BackButton";

interface StackHeaderProps {
  title?: string;
}

export default function StackHeader({ title }: StackHeaderProps) {
  return (
    <div className="flex items-center relative">
      <div className="absolute left-8 top-0 h-full flex items-center">
        <BackButton />
      </div>
      <p className="w-full text-center font-semibold text-lg">{title}</p>
    </div>
  );
}
