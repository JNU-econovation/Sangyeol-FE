import useToast from "@service/toast";

const useDeviationToast = () => {
  const showToast = useToast();

  const showDeviationToast = () => {
    showToast({
      type: "error",
      text1: "경로 이탈 감지",
      text2: "정해진 경로를 벗어났습니다.",
    });
  };

  return { showDeviationToast };
};

export default useDeviationToast;
