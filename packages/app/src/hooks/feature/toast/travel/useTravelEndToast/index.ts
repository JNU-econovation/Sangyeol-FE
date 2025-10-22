import useToast from "@service/toast";

const useTravelEndToast = () => {
  const showToast = useToast();

  const showTravelEndToast = () => {
    showToast({
      type: "success",
      text1: "여행 종료",
      text2: "안전하게 여행을 마치셨나요? 수고하셨습니다!",
    });
  };
  return { showTravelEndToast };
};

export default useTravelEndToast;
