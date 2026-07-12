"use client";

import PositionBottom from "@shared/layout/PositionBottom";
import Spacing from "@shared/layout/Spacing";
import Button from "@shared/ui/Button";
import { cn } from "@/utils/cn";
import WeekHeader from "@widgets/WeekHeader";
import { useEffect, useRef, useState } from "react";

const DiscountCouponPage = () => {
  const couponTitle = "부곡정 10% 할인 코드";

  const [inputValues, setInputValues] = useState(["", "", ""]);
  // const { registerFocus } = useFocus();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputValues.every((value) => value !== "")) {
      inputRef.current?.blur();
    }
  }, [inputValues]);

  return (
    <>
      <WeekHeader headerText="쿠폰 입력" />
      <div className="px-6 h-full overflow-auto">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-bold text-primary">{couponTitle}</h2>
          <Spacing size={5} />
          <p className="text-lg">3자리 코드를 입력하세요</p>
          <Spacing size={5} />
          <div
            role="button"
            className="flex gap-8 items-center justify-center"
            onClick={(e) => {
              e.stopPropagation();
              inputRef.current?.focus();
            }}
          >
            {inputValues.map((value, index) => (
              <div
                key={index}
                id={`input${index + 1}`}
                className={cn(
                  "w-16 h-16 text-center border border-gray-900 rounded-xl font-bold text-4xl text-primary flex items-center justify-center",
                  {
                    "!outline-none !ring-2 !ring-primary":
                      inputValues[index] !== "" ||
                      (inputValues[index + 1] !== "" &&
                        index !== inputValues.length - 1),
                  },
                )}
              >
                {inputValues[index]}
              </div>
            ))}
          </div>
          <input
            type="number"
            inputMode="numeric"
            ref={inputRef}
            className="w-0 h-0"
            value={inputValues.join("")}
            onChange={(e) => {
              const v = e.target.value;
              const newValue = [v[0] || "", v[1] || "", v[2] || ""];
              setInputValues(newValue);
            }}
          />

          <Spacing size={7.5} />

          {/*  */}

          <div className="border rounded-lg border-gray-500 px-3 py-6 text-gray-900 shadow-sm min-w-0 break-words w-full">
            <h4 className="text-black-800 text-lg font-bold leading-5">
              사용 방법
            </h4>
            <ul className="list-disc pl-6">
              <li>
                <span>결제 전에 쿠폰 화면을 보여주세요.</span>
              </li>
              <li>
                <span>사장님께 오늘의 3자리 인증코드를 확인하세요.</span>
              </li>
              <li>
                <span>인증코드를 입력하면 쿠폰이 사용됩니다.</span>
              </li>
              <li>
                <span>할인 혜택이 적용됩니다.</span>
              </li>
            </ul>
            <Spacing size={5} />
            <h4 className="text-black-800 text-lg font-bold leading-5">
              유효 기간
            </h4>
            <ul className="list-disc pl-6">
              <li>
                <span>발급 당일에만 사용가능합니다.</span>
              </li>
              <li>
                <span>당일 23:59 이후 자동으로 만료됩니다.</span>
              </li>
            </ul>
            <Spacing size={5} />
            <h4 className="text-black-800 text-lg font-bold leading-5">
              유의사항
            </h4>
            <ul className="list-disc pl-6">
              <li>
                <span>사용 완료된 쿠폰은 재사용할 수 없습니다.</span>
              </li>
              <li>
                <span>일부 메뉴는 할인 대상에서 제외될 수 있습니다.</span>
              </li>
              <li>
                <span>다른 할인 및 쿠폰과 중복 적용이 제한될 수 있습니다.</span>
              </li>
              <li>
                <span>결제 전에 쿠폰을 제시해 주세요.</span>
              </li>
            </ul>
          </div>
        </div>
        <Spacing size={20} />
      </div>
      <PositionBottom padding={6}>
        <Button fullWidth>확인</Button>
      </PositionBottom>
    </>
  );
};

export default DiscountCouponPage;
