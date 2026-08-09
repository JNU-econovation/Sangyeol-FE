import { useModalContext } from "@shared/model/modal";
import LogoutAlertModal from "@modules/features/authenticate/LogoutAlertModal";

const useLogoutAlertModal = () => {
  const { addModalAsync } = useModalContext();

  const openLogoutAlertModal = () => {
    addModalAsync(<LogoutAlertModal />);
  };

  return { openLogoutAlertModal };
};

export default useLogoutAlertModal;
