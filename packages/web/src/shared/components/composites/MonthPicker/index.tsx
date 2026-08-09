"use client";

import PositionBottom from "@shared/components/primitives/layout/PositionBottom";
import {
  WheelPicker,
  WheelPickerOption,
  WheelPickerWrapper,
} from "../WheelPicker";
import { useMemo, useState } from "react";

const START_YEAR = 2026;

const monthOptions: WheelPickerOption<number>[] = [
  { label: "1월", value: 0 },
  { label: "2월", value: 1 },
  { label: "3월", value: 2 },
  { label: "4월", value: 3 },
  { label: "5월", value: 4 },
  { label: "6월", value: 5 },
  { label: "7월", value: 6 },
  { label: "8월", value: 7 },
  { label: "9월", value: 8 },
  { label: "10월", value: 9 },
  { label: "11월", value: 10 },
  { label: "12월", value: 11 },
];

export interface MonthPickerProps {
  defaultValue?: { year: number; month: number };
  onConfirm?: (value: { year: number; month: number }) => void;
  onCancel?: () => void;
}

const MonthPicker = ({
  defaultValue,
  onConfirm,
  onCancel,
}: MonthPickerProps) => {
  const today = new Date();
  const yearOptions = useMemo<WheelPickerOption<number>[]>(() => {
    const currentYear = new Date().getFullYear();
    return Array.from(
      { length: Math.max(currentYear - START_YEAR + 1, 1) },
      (_, index) => {
        const year = currentYear - index;
        return { label: `${year}년`, value: year };
      },
    );
  }, []);

  const [ym, setYm] = useState<{ year: number; month: number }>({
    year: defaultValue ? defaultValue.year : today.getFullYear(),
    month: defaultValue ? defaultValue.month : today.getMonth(),
  });

  const handleConfirm = () => {
    onConfirm?.(ym);
  };

  return (
    <PositionBottom bottom={70}>
      <div className="bg-white">
        <div className="w-full justify-between flex px-4 py-2 bg-primary">
          <button className="text-white" onClick={() => onCancel?.()}>
            취소
          </button>
          <button className="text-white" onClick={handleConfirm}>
            선택
          </button>
        </div>
        <WheelPickerWrapper>
          {/* <div className="w-50 flex mx-auto !text-lg"> */}
          <WheelPicker
            options={yearOptions}
            defaultValue={ym.year}
            visibleCount={17}
            classNames={{
              optionItem: "!text-xl !justify-end !px-8 text-gray-700",
              highlightItem: "text-xl !justify-end !px-8",
            }}
            onValueChange={(year) => {
              const newYm = { ...ym, year };
              setYm(newYm);
            }}
            optionItemHeight={32}
          />
          <WheelPicker
            options={monthOptions}
            defaultValue={ym.month}
            visibleCount={17}
            optionItemHeight={32}
            classNames={{
              optionItem: "!text-xl !justify-start !px-8 text-gray-700",
              highlightItem: "text-xl !justify-start !px-8",
            }}
            onValueChange={(month) => {
              const newYm = { ...ym, month };
              setYm(newYm);
            }}
          />
          {/* </div> */}
        </WheelPickerWrapper>
      </div>
    </PositionBottom>
  );
};

export default MonthPicker;
