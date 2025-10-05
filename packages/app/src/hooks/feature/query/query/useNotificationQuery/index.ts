import authenticatedApi from "@api/_instances/authenticatedApi";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getAlert, USER_ALERT_API_PATH } from "api";

const useNotificationQuery = () => {
  return useSuspenseQuery({
    queryKey: [USER_ALERT_API_PATH],
    queryFn: () => getAlert(authenticatedApi),
  });
};

export default useNotificationQuery;
