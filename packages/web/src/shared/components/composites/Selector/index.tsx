import { cn } from "@shared/lib/cn";
import SelectorCloseIcon from "@icons/SelectorCloseIcon";
import SelectorOpenIcon from "@icons/SelectorOpenIcon";
import Spacing from "@shared/components/primitives/layout/Spacing";
import { useEffect, useState } from "react";

interface SelectorProps {
  options: {
    text: string;
    value: string;
  }[];
  onSelect?: (optionValue: string) => void;
  value?: string;
}

export default function Selector({ options, onSelect, value }: SelectorProps) {
  const [optionsOpen, setOptionsOpen] = useState(false);
  const [selectedOptionValue, setSelectedOptionValue] = useState<string | null>(
    value || null,
  );

  useEffect(() => {
    setSelectedOptionValue(value || null);
  }, [value]);

  return (
    <div
      className="relative w-full"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setOptionsOpen(!optionsOpen);
        }
      }}
    >
      <button
        className="border border-primary rounded-full font-medium text-base text-center text-black w-full py-1"
        onClick={(e) => {
          if (e.target !== e.currentTarget) {
            setOptionsOpen(!optionsOpen);
            return;
          }
          setOptionsOpen(true);
        }}
        role="combobox"
        aria-expanded={optionsOpen}
        aria-haspopup="listbox"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            setOptionsOpen(!optionsOpen);
          }
        }}
      >
        <p>
          {options.find(({ value }) => `${value}` === `${selectedOptionValue}`)
            ?.text ?? "Select an option"}
        </p>
        <div className="absolute top-1/2 right-4 -translate-y-1/2">
          {optionsOpen ? <SelectorOpenIcon /> : <SelectorCloseIcon />}
        </div>
      </button>

      <div className="absolute max-h-42 overflow-y-auto w-full bg-white rounded-b-2xl shadow-lg">
        <Spacing size={2} />
        {optionsOpen &&
          options.map(({ text, value }, index) => (
            <div
              key={`${text}-${index}`}
              className={cn("p-1 cursor-pointer text-center", {
                "bg-gray-30": `${value}` === `${selectedOptionValue}`,
                visible: optionsOpen,
                invisible: !optionsOpen,
                "text-primary font-semibold":
                  `${value}` === `${selectedOptionValue}`,
              })}
              onClick={() => {
                if (value === selectedOptionValue) return;

                onSelect?.(value);
                setSelectedOptionValue(value);

                setOptionsOpen(false);
              }}
            >
              {text}
            </div>
          ))}
      </div>
    </div>
  );
}
