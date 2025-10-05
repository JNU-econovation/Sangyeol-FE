import NotificationHeader from "@screens/notification/NotificationHeader";
import NotificationList from "@screens/notification/NotificationList";
import ScreenContainer from "@shared/layout/Screen";

const NotificationSettingScreen = () => {
  return (
    <ScreenContainer>
      <NotificationHeader />
      <NotificationList />
    </ScreenContainer>
  );
};

export default NotificationSettingScreen;
