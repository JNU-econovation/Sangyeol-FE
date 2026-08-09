import { useModalContext } from "@shared/model/modal";
import LogoutModal from "@modules/features/authenticate/LogoutModal";

const useLogoutModal = () => {
  const { addModalAsync } = useModalContext();

  const openLogoutModal = () => {
    addModalAsync(<LogoutModal />);
  };

  return { openLogoutModal };
};

export default useLogoutModal;
