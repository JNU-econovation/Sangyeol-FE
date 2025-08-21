import { useModalContext } from "@/service/modal";
import LogoutModal from "@widgets/authenticate/LogoutModal";

const useLogoutModal = () => {
  const { addModalAsync } = useModalContext();

  const openLogoutModal = () => {
    addModalAsync(<LogoutModal />);
  };

  return { openLogoutModal };
};

export default useLogoutModal;
