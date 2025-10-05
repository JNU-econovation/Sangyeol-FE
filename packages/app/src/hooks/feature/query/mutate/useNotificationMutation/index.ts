import authenticatedApi from "@api/_instances/authenticatedApi";
import queryClient from "@service/query/client";
import { useMutation } from "@tanstack/react-query";
import { putAlert, PutAlertRequest, USER_ALERT_API_PATH } from "api";

const useNotificationMutation = () => {
  return useMutation({
    mutationKey: [USER_ALERT_API_PATH],
    mutationFn: (body: PutAlertRequest) => putAlert(authenticatedApi, body),
    onMutate: () => {
      queryClient.invalidateQueries({ queryKey: [USER_ALERT_API_PATH] });
    },
  });
};

export default useNotificationMutation;
