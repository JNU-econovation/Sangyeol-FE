"use client";

import { useModalContext } from "@/service/modal";
import useDeleteTravelRecordMutation from "@hooks/feature/query/mutate/useDeleteTravelRecordMutation";
import Spacing from "@shared/layout/Spacing";
import Button from "@shared/ui/Button";
import Dimmed from "@shared/ui/Dimmed";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useStackLinkBack } from "stack-link";

const TravelLogDeleteModal = () => {
  const { recordId } = useParams<{ recordId: string }>();
  const { mutate: deleteTravelRecord } = useDeleteTravelRecordMutation();
  const { closeModalAsync } = useModalContext();
  const { goBack } = useStackLinkBack();

  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    if (trigger) {
      setTimeout(() => {
        goBack({});
      }, 0);
      setTimeout(() => {
        closeModalAsync();
      }, 200);
    }
  }, [goBack, trigger]);

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
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (recordId)
                    deleteTravelRecord(recordId, {
                      onSuccess: () => {
                        // closeModalAsync();
                        setTrigger(true);
                      },
                      onError: (e) => {
                        console.log(e);
                      },
                    });
                }}
              >
                확인
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Dimmed>
  );
};

export default TravelLogDeleteModal;
