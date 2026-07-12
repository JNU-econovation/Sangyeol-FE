import { useModalContext } from "@/service/modal";
import CouponFailureModal from "@pages/discount-coupon/CouponFailureModal";

const useCouponFailureModal = () => {
  const { addModalAsync } = useModalContext();

  const openCouponFailureModal = () => {
    addModalAsync(<CouponFailureModal />);
  };

  return { openCouponFailureModal };
};

export default useCouponFailureModal;
