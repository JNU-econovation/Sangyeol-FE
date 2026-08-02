import styled from "@emotion/native";
import SwitchItem from "@entities/SwitchItem";
import useNotificationModal from "@hooks/feature/modal/useNotificationModal";
import useNotificationMutation from "@hooks/feature/query/mutate/useNotificationMutation";
import useNotificationQuery from "@hooks/feature/query/query/useNotificationQuery";
import Spacing from "@shared/layout/Spacing";
import { Suspense } from "@suspensive/react";
import { useState } from "react";

import NotificationListLoader from "./loader";

const NotificationList = Suspense.with(
  {
    fallback: <NotificationListLoader />,
  },
  () => {
    const {
      data: {
        userAlertSetting: {
          eventAlert,
          accidentProneAreaAlert,
          travelDeviationAlert,
        },
      },
    } = useNotificationQuery();
    const { mutate: updateAlertSetting } = useNotificationMutation();
    const { showNotificationModal } = useNotificationModal();

    const [notificationSetting, setNotificationSetting] = useState({
      eventAlert,
      accidentProneAreaAlert,
      travelDeviationAlert,
    });

    const handleEventToggle = (value: boolean) => {
      setNotificationSetting((prev) => ({ ...prev, eventAlert: value }));
      updateAlertSetting({
        eventAlert: value,
        travelDeviationAlert: notificationSetting.travelDeviationAlert,
        accidentProneAreaAlert: notificationSetting.accidentProneAreaAlert,
      });
    };

    const handleRouteDeviationToggle = (value: boolean) => {
      if (!value) {
        showNotificationModal({
          onConfirm: () => {
            setNotificationSetting((prev) => ({
              ...prev,
              travelDeviationAlert: value,
            }));
            updateAlertSetting({
              eventAlert: notificationSetting.eventAlert,
              travelDeviationAlert: value,
              accidentProneAreaAlert:
                notificationSetting.accidentProneAreaAlert,
            });
          },
          onCancel: () => {
            setNotificationSetting((prev) => ({
              ...prev,
              travelDeviationAlert: !value,
            }));
          },
        });
        return;
      }
      setNotificationSetting((prev) => ({
        ...prev,
        travelDeviationAlert: value,
      }));
      updateAlertSetting({
        eventAlert: notificationSetting.eventAlert,
        travelDeviationAlert: value,
        accidentProneAreaAlert: notificationSetting.accidentProneAreaAlert,
      });
    };

    const handleAccidentZoneToggle = (value: boolean) => {
      if (!value) {
        showNotificationModal({
          onConfirm: () => {
            setNotificationSetting((prev) => ({
              ...prev,
              accidentProneAreaAlert: value,
            }));
            updateAlertSetting({
              eventAlert: notificationSetting.eventAlert,
              travelDeviationAlert: notificationSetting.travelDeviationAlert,
              accidentProneAreaAlert: value,
            });
          },
          onCancel: () => {
            setNotificationSetting((prev) => ({
              ...prev,
              accidentProneAreaAlert: !value,
            }));
          },
        });
        return;
      }
      setNotificationSetting((prev) => ({
        ...prev,
        accidentProneAreaAlert: value,
      }));
      updateAlertSetting({
        eventAlert: notificationSetting.eventAlert,
        travelDeviationAlert: notificationSetting.travelDeviationAlert,
        accidentProneAreaAlert: value,
      });
    };

    const handleAllToggle = (value: boolean) => {
      if (!value) {
        showNotificationModal({
          onConfirm: () => {
            setNotificationSetting({
              eventAlert: value,
              accidentProneAreaAlert: value,
              travelDeviationAlert: value,
            });
            updateAlertSetting({
              eventAlert: value,
              travelDeviationAlert: value,
              accidentProneAreaAlert: value,
            });
          },
          onCancel: () => {
            setNotificationSetting({
              eventAlert: true,
              accidentProneAreaAlert: true,
              travelDeviationAlert: true,
            });
          },
        });
        return;
      }
      setNotificationSetting({
        eventAlert: value,
        accidentProneAreaAlert: value,
        travelDeviationAlert: value,
      });
      updateAlertSetting({
        eventAlert: value,
        travelDeviationAlert: value,
        accidentProneAreaAlert: value,
      });
    };

    return (
      <Container>
        <SwitchItem
          text="전체 알림"
          borderBottom
          value={
            notificationSetting.eventAlert &&
            notificationSetting.accidentProneAreaAlert &&
            notificationSetting.travelDeviationAlert
          }
          onToggle={handleAllToggle}
        />
        <Spacing size={32} />
        <SwitchItem
          text="이벤트·혜택 알림"
          value={notificationSetting.eventAlert}
          onToggle={handleEventToggle}
        />
        <Spacing size={32} />
        <SwitchItem
          text="경로 이탈 알림"
          value={notificationSetting.travelDeviationAlert}
          onToggle={handleRouteDeviationToggle}
        />
        <Spacing size={32} />
        <SwitchItem
          text="사고 다발 구역 알림"
          value={notificationSetting.accidentProneAreaAlert}
          onToggle={handleAccidentZoneToggle}
        />
      </Container>
    );
  },
);

const Container = styled.View`
  padding: 28px;
`;

export default NotificationList;
