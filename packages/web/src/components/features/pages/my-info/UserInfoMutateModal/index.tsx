import { useModalContext } from "@/service/modal";
import Spacing from "@shared/layout/Spacing";
import Button from "@shared/ui/Button";
import Dimmed from "@shared/ui/Dimmed";

// TODO: PROPS를 받지 않고 모달 내에서 useMyProfileFormContext를 사용하여 처리하도록 수정 필요
interface UserInfoMutateModalProps {
  handleConfirm: () => void;
}

const UserInfoMutateModal = ({ handleConfirm }: UserInfoMutateModalProps) => {
  const { closeModalAsync } = useModalContext();

  return (
    <Dimmed
      typeof="button"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModalAsync();
        closeModalAsync();
      }}
    >
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
        <div className="bg-white rounded-lg shadow-lg p-0 w-72">
          <div className="flex flex-col items-center p-4">
            <Spacing size={10} />
            <span>입력하신 정보로 수정하시겠습니까?</span>
            <Spacing size={10} />
            <div className="flex justify-center gap-4 w-full">
              <Button
                color={"gray"}
                onClick={() => {
                  closeModalAsync();
                  closeModalAsync();
                }}
                size={"md"}
                className="grow text-white"
              >
                취소
              </Button>
              <Button size={"md"} className="grow" onClick={handleConfirm}>
                확인
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Dimmed>
  );
};

export default UserInfoMutateModal;
