import { useModalContext } from "@/service/modal";
import CouponSuccessModal from "@pages/discount-coupon/CouponSuccessModal";

const useCouponSuccessModal = () => {
  const { addModalAsync } = useModalContext();

  const openCouponSuccessModal = () => {
    addModalAsync(<CouponSuccessModal />);
  };

  return { openCouponSuccessModal };
};

export default useCouponSuccessModal;
