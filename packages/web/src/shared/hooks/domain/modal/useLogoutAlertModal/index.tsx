import { useModalContext } from "@service/modal";
import LogoutAlertModal from "@modules/features/authenticate/LogoutAlertModal";

const useLogoutAlertModal = () => {
  const { addModalAsync } = useModalContext();

  const openLogoutAlertModal = () => {
    addModalAsync(<LogoutAlertModal />);
  };

  return { openLogoutAlertModal };
};

export default useLogoutAlertModal;
