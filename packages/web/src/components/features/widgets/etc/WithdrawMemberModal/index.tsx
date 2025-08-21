// import { useRef } from "react";

// import ModalPortal from "@entities/ModalPortal";
// import useOutsideClick from "@/hooks/common/useOutsideClick";
// import Text from "@shared/ui/Text";
// import Button from "@shared/ui/Button";
// import Spacing from "@shared/layout/Spacing";

// interface ModalProps {
//   openModal: () => void;
//   closeModal: () => void;
// }

// export default function WithdrawMemberModal({
//   closeModal,
// }: // openModal,
// ModalProps) {
//   const modalRef = useRef<HTMLDivElement>(null!);

//   useOutsideClick([modalRef], closeModal);

//   return (
//     <ModalPortal>
//       <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
//         <div ref={modalRef} className="w-80 bg-white rounded-lg shadow-lg">
//           <div className="flex flex-col items-center p-8">
//             <Text fontSize="text-xl">탈퇴하시겠습니까?</Text>
//             <Spacing size={4} />
//             <div className="flex justify-center gap-4 w-full">
//               <Button fullWidth color={"gray"} onClick={closeModal}>
//                 취소
//               </Button>
//               <Spacing size={4} />
//               <Button fullWidth>탈퇴</Button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </ModalPortal>
//   );
// }
