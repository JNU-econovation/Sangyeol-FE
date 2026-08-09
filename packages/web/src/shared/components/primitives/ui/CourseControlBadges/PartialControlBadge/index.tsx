const PartialControlBadge = () => {
  return (
    <div className="flex items-center gap-1.5 rounded-full border border-error bg-error/10 px-2.5 py-1.5">
      <span className="size-1.5 shrink-0 rounded-full bg-error" />
      <span className="text-xs font-medium text-error">부분통제</span>
    </div>
  );
};

export default PartialControlBadge;
