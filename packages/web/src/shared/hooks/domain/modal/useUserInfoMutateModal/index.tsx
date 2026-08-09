import { useModalContext } from "@shared/model/modal";
import UserInfoMutateModal from "@modules/widgets/my-info/UserInfoMutateModal";

const useUserInfoMutateModal = (handleConfirm: () => void) => {
  const { addModalAsync } = useModalContext();

  const openUserInfoMutateModal = () => {
    addModalAsync(<UserInfoMutateModal handleConfirm={handleConfirm} />);
  };

  return { openUserInfoMutateModal };
};

export default useUserInfoMutateModal;
