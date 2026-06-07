import { cn } from "@/utils/cn";
import Spacing from "@shared/layout/Spacing";
import { useEffect, useRef, useState } from "react";

export interface WheelPickerOption<T = string> {
  label: string;
  value: T;
}

export interface WheelPickerProps<T extends string> {
  options: WheelPickerOption<T>[];
  value: T | null;
  onChange: (value: T) => void;
  placeholder?: string;
}

const WheelPickerInput = <T extends string>({
  options = [],
  value, // TODO: 선택된 값이지만 외부에 의존하고 있음. 선택은 내부에서 함. 외부에서 선택된 값으로 올바르게 보여줘야 하는 불필요한 책임이 생김
  onChange,
  placeholder = "선택하세요",
}: WheelPickerProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tempValue, setTempValue] = useState<T | null>(value);
  const pickerRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setTempValue(value);
  }, [value]);

  // 모달이 열릴 때 초기 스크롤 위치 설정
  useEffect(() => {
    if (isOpen && pickerRef.current) {
      const selectedIndex = options.findIndex((opt) => opt.value === value);
      if (selectedIndex !== -1) {
        const itemHeight = 44; // h-11 = 44px
        const scrollPosition = selectedIndex * itemHeight;
        pickerRef.current.scrollTop = scrollPosition;
      }
    }
  }, [isOpen, value, options]);

  // 스크롤 이벤트 감지 및 중앙 아이템 선택
  const handleScroll = () => {
    if (!pickerRef.current) return;

    // 기존 타이머 클리어
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    // 스크롤이 멈춘 후 실행
    scrollTimeoutRef.current = setTimeout(() => {
      if (!pickerRef.current) return;

      const containerRect = pickerRef.current.getBoundingClientRect();
      const centerY = containerRect.top + containerRect.height / 2;

      // 모든 아이템 중 중앙에 가장 가까운 아이템 찾기
      const items = pickerRef.current.querySelectorAll("[data-picker-item]");
      let closestItem: Element | null = null;
      let closestDistance = Infinity;

      items.forEach((item) => {
        const rect = item.getBoundingClientRect();
        const itemCenterY = rect.top + rect.height / 2;
        const distance = Math.abs(centerY - itemCenterY);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestItem = item;
        }
      });

      if (closestItem) {
        const selectedValue = closestItem.getAttribute("data-value");
        if (selectedValue) {
          setTempValue(selectedValue as T);
        }
      }
    }, 100);
  };

  const handleConfirm = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (tempValue != null) {
      onChange(tempValue);
    }
    setIsOpen(false);
  };

  const handleCancel = (e: React.MouseEvent) => {
    e.stopPropagation();
    setTempValue(value);
    setIsOpen(false);
  };

  const getSelectedLabel = () => {
    const selected = options.find((opt) => opt.value === value);
    return selected ? selected.label : placeholder;
  };

  return (
    <>
      {/* Input Field */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="w-full px-4 py-3 text-left bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        <span className={value ? "text-black" : "text-gray-400"}>
          {getSelectedLabel()}
        </span>
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-50 flex items-end justify-center"
          onClick={handleCancel}
        >
          {/* Picker Container */}
          <div
            className="bg-white w-full rounded-t-3xl shadow-lg animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Toolbar */}
            <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200 bg-primary">
              <button
                onClick={handleCancel}
                className="text-main-white text-base font-normal"
              >
                취소
              </button>
              <button
                onClick={handleConfirm}
                className="text-main-white text-base font-semibold"
              >
                완료
              </button>
            </div>

            {/* Picker Wheel */}
            <div className="relative h-64 overflow-hidden">
              {/* Selection Highlight */}
              <div className="absolute w-11/12 top-1/2 left-1/2 -translate-x-1/2 h-11 -translate-y-1/2 border-gray-300 bg-gray-300 rounded-xl opacity-50 pointer-events-none" />

              {/* Options List */}
              <div
                ref={pickerRef}
                className="absolute inset-0 overflow-y-scroll snap-y snap-mandatory"
                onScroll={handleScroll}
                style={{
                  scrollSnapType: "y mandatory",
                  scrollPaddingTop: "110px",
                  scrollPaddingBottom: "110px",
                }}
              >
                {/* Top Spacer */}
                <Spacing size={28} />

                {/* Options */}
                {options.map(({ label, value }, index) => (
                  <div
                    key={`${value}-${index}`}
                    data-picker-item
                    data-value={value}
                    onClick={() => {
                      setTempValue(value);
                      // 클릭 시 해당 아이템으로 스크롤
                      if (pickerRef.current) {
                        const itemHeight = 44;
                        const scrollPosition = index * itemHeight;
                        pickerRef.current.scrollTo({
                          top: scrollPosition,
                          behavior: "smooth",
                        });
                      }
                    }}
                    className={cn(
                      "h-11 flex items-center justify-center cursor-pointer snap-center transition-all duration-200",
                    )}
                  >
                    <span
                      className={cn(
                        "text-xl font-medium transition-all duration-200 text-black-800 z-20",
                      )}
                    >
                      {label}
                    </span>
                  </div>
                ))}

                {/* Bottom Spacer */}
                <Spacing size={28} />
              </div>

              {/* Gradient Overlays */}
              <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-white/80 to-transparent pointer-events-none z-20" />
              <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-white to-transparent pointer-events-none z-20" />

              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white/80 to-transparent pointer-events-none z-20" />
              <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-white to-transparent pointer-events-none z-20" />
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }

        /* Hide scrollbar */
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
};

export default WheelPickerInput;
