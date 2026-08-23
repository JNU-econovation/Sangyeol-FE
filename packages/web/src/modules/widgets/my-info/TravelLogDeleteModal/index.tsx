"use client";

import { useModalContext } from "@service/modal";
import useDeleteTravelRecordMutation from "@shared/api/mutates/useDeleteTravelRecordMutation";
import Spacing from "@shared/components/primitives/layout/Spacing";
import Button from "@shared/components/primitives/ui/Button";
import Dimmed from "@shared/components/primitives/ui/Dimmed";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useStackLinkBack } from "stack-link";

const TravelLogDeleteModal = () => {
  const { recordId } = useParams<{ recordId: string }>();
  const { mutate: deleteTravelRecord, isPending } =
    useDeleteTravelRecordMutation();
  const { closeModalAsync } = useModalContext();
  const { goBack } = useStackLinkBack();

  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    if (trigger) {
      goBack({ animation: "fade" });
    }
  }, [goBack, closeModalAsync, trigger]);

  return (
    <Dimmed
      typeof="button"
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        if (e.target === e.currentTarget) closeModalAsync();
        closeModalAsync();
      }}
      onScroll={(e) => {
        e.stopPropagation();
        e.preventDefault();
        if (e.target === e.currentTarget) closeModalAsync();
        closeModalAsync();
      }}
    >
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
        <div className="bg-white rounded-lg shadow-lg p-0 w-72">
          <div className="flex flex-col items-center p-4">
            <Spacing size={10} />
            <span className="text-base">삭제하시겠습니까?</span>
            <Spacing size={10} />
            <div className="flex justify-center gap-4 w-full">
              <Button
                color={"gray"}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  closeModalAsync();
                }}
                size={"md"}
                className="grow text-white"
              >
                취소
              </Button>
              <Button
                size={"md"}
                className="grow"
                disabled={isPending}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (recordId)
                    deleteTravelRecord(recordId, {
                      onSuccess: () => {
                        alert("삭제되었습니다.");
                        // closeModalAsync();
                        setTrigger(true);
                      },
                      onError: (e) => {
                        console.error(e);
                      },
                    });
                }}
              >
                {isPending ? "삭제중" : "확인"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Dimmed>
  );
};

export default TravelLogDeleteModal;
