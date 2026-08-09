import { useModalContext } from "@shared/model/modal";
import CouponSuccessModal from "@modules/widgets/discount-coupon/CouponSuccessModal";

const useCouponSuccessModal = () => {
  const { addModalAsync } = useModalContext();

  const openCouponSuccessModal = () => {
    addModalAsync(<CouponSuccessModal />);
  };

  return { openCouponSuccessModal };
};

export default useCouponSuccessModal;
