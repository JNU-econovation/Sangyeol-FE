import { useModalContext } from "@service/modal";
import LogoutModal from "@modules/features/authenticate/LogoutModal";

const useLogoutModal = () => {
  const { addModalAsync } = useModalContext();

  const openLogoutModal = () => {
    addModalAsync(<LogoutModal />);
  };

  return { openLogoutModal };
};

export default useLogoutModal;
