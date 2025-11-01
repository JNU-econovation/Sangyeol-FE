import SearchIcon from "@icons/SearchIcon";

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  inputRef?: React.RefObject<HTMLInputElement | null>;
  handleSearch?: () => void;
}

export default function SearchInput({
  inputRef,
  handleSearch,
  ...props
}: SearchInputProps) {
  return (
    <div className="relative z-10">
      <input
        className="rounded-full text-lg py-4 px-6 shadow w-full relative bg-white"
        ref={inputRef}
        type="text"
        {...props}
      />
      <button
        onClick={handleSearch}
        className="absolute top-1/2 right-4 -translate-y-1/2"
      >
        <SearchIcon />
      </button>
    </div>
  );
}
