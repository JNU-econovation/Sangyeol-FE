import HomeProfileModalForm from "@components/feature/screens/Home/HomeProfileModalForm";
import useModal from "@service/modal/hooks";

const usePersonalInfoModal = () => {
  const { openModal, closeModal } = useModal();

  const showNotificationModal = () => {
    openModal(<HomeProfileModalForm closeModal={closeModal} />, {
      transparent: true,
      animationType: "none",
      hardwareAccelerated: true,
    });
  };

  return { showNotificationModal };
};

export default usePersonalInfoModal;
