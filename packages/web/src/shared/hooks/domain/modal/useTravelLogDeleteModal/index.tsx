import { useModalContext } from "@shared/model/modal";
import TravelLogDeleteModal from "@modules/widgets/my-info/TravelLogDeleteModal";
import { useEffect } from "react";

const useTravelLogDeleteModal = () => {
  const { addModalAsync } = useModalContext();
  const { closeModalAsync } = useModalContext();

  useEffect(() => {
    return () => {
      closeModalAsync();
    };
  }, []);

  const openTravelLogDeleteModal = () => {
    addModalAsync(<TravelLogDeleteModal />);
  };

  return { openTravelLogDeleteModal };
};

export default useTravelLogDeleteModal;
