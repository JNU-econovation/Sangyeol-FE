"use client";

import { useModalContext } from "@service/modal";
import Spacing from "@shared/components/primitives/layout/Spacing";
import Button from "@shared/components/primitives/ui/Button";
import Dimmed from "@shared/components/primitives/ui/Dimmed";
import Text from "@shared/components/primitives/ui/Text";

const CouponFailureModal = () => {
  const { closeModalAsync } = useModalContext();

  return (
    <Dimmed>
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
        <div className="bg-white rounded-lg shadow-lg p-0 w-72">
          <div className="flex flex-col items-center p-4">
            <Spacing size={10} />
            <Text fontSize="text-base">정확하지 않은 코드입니다.</Text>
            <Text fontSize="text-base">코드를 다시 한 번 확인해주세요.</Text>
            <Spacing size={10} />
            <Button size={"md"} fullWidth onClick={closeModalAsync}>
              확인
            </Button>
          </div>
        </div>
      </div>
    </Dimmed>
  );
};

export default CouponFailureModal;
