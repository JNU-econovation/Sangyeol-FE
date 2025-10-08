import { useModalContext } from "@/service/modal";
import UserInfoMutateModal from "@pages/my-info/UserInfoMutateModal";

const useUserInfoMutateModal = (handleConfirm: () => void) => {
  const { addModalAsync } = useModalContext();

  const openUserInfoMutateModal = () => {
    addModalAsync(<UserInfoMutateModal handleConfirm={handleConfirm} />);
  };

  return { openUserInfoMutateModal };
};

export default useUserInfoMutateModal;
