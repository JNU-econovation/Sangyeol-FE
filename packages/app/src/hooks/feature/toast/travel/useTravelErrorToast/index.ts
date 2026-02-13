import useToast from "@service/toast";

const useTravelErrorToast = () => {
  const showToast = useToast();

  const showTravelErrorToast = () => {
    showToast({
      type: "error",
      text1: "산행 오류 발생",
      text2: "산행 중 오류가 발생했습니다.",
    });
  };
  return { showTravelErrorToast };
};

export default useTravelErrorToast;
