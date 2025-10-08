import { useModalContext } from "@/service/modal";
import TravelLogDeleteModal from "@pages/my-info/TravelLogDeleteModal";

const useTravelLogDeleteModal = () => {
  const { addModalAsync } = useModalContext();

  const openTravelLogDeleteModal = () => {
    addModalAsync(<TravelLogDeleteModal />);
  };

  return { openTravelLogDeleteModal };
};

export default useTravelLogDeleteModal;
