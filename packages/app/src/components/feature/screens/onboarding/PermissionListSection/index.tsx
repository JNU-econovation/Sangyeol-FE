import styled from "@emotion/native";
import Spacing from "@shared/layout/Spacing";
import DefaultButton from "@shared/ui/buttons/DefaultButton";
import ListItemCard from "@shared/ui/ListItemCard";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { router } from "expo-router";
import { ComponentProps, useCallback, useState } from "react";
import { Alert, Linking, Platform } from "react-native";

const DEFAULT_PERMISSIONS: Omit<
  ComponentProps<typeof ListItemCard>,
  "title"
>[] = [
  {
    checked: false,
    selected: true,
    disabled: false,
  },
  {
    selected: false,
    disabled: true,
  },
  {
    selected: false,
    disabled: true,
  },
];

const PERMISSION_TITLES = [
  "위치 정보 권한 허용",
  "음성 녹음 권한 허용",
  "사진 권한 허용",
];

const REQUEST = [
  async () => {
    const isPreviousGranted = await Location.hasServicesEnabledAsync();
    if (!isPreviousGranted) {
      Alert.alert("위치 정보 권한 요청", "위치 정보 권한이 필요합니다.");
      return false;
    }

    Location.getBackgroundPermissionsAsync();
    let { status: foregroundStatus } =
      await Location.requestForegroundPermissionsAsync();

    // let { status: backgroundStatus } =
    //   await Location.requestBackgroundPermissionsAsync();
    return foregroundStatus === "granted";
    // && backgroundStatus === "granted";
  },
  async () => {
    //TODO: 음성 녹음 권한 요청
    return true;
  },
  async () => {
    const { granted: cameraGranted } =
      await ImagePicker.requestCameraPermissionsAsync();
    const { granted: libraryGranted } =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    return cameraGranted && libraryGranted;
  },
];

const PermissionListSection = () => {
  const [permissionData, setPermissionData] = useState(DEFAULT_PERMISSIONS);
  const [currentIndex, setCurrentIndex] = useState(0);

  const completePermissionAccept = currentIndex >= PERMISSION_TITLES.length;

  const openAppSettings = useCallback(() => {
    if (Platform.OS === "ios") {
      Linking.openURL("app-settings:");
    } else {
      Linking.openSettings();
    }
  }, []);

  const handlePress = useCallback(async () => {
    if (completePermissionAccept) {
      router.replace("/onboarding/profile");
      return;
    }

    const result = await REQUEST[currentIndex]();

    if (!result) {
      Alert.alert(
        "권한 요청에 실패했습니다.",
        "해당 권한은 앱 사용을 위해 꼭 필요합니다",
        [
          { text: "나중에", style: "cancel" },
          { text: "설정으로 이동", onPress: openAppSettings },
        ],
      );
      return;
    }

    const nextIndex = currentIndex + 1;
    setCurrentIndex(nextIndex);
    setPermissionData((prev) =>
      prev.map((_, index) => {
        const newChecked = index < nextIndex;
        const newSelected = index === nextIndex;
        const newDisabled = index > nextIndex;
        return {
          checked: newChecked,
          selected: newSelected,
          disabled: newDisabled,
        };
      }),
    );
  }, [currentIndex]);

  return (
    <>
      <PermissionList>
        {permissionData.map((listProps, index) => (
          <ListItemCard
            key={`${index}-${PERMISSION_TITLES[index]}`}
            title={PERMISSION_TITLES[index]}
            {...listProps}
          />
        ))}
      </PermissionList>
      <Spacing size={80} />
      <ButtonContainer>
        <DefaultButton
          title={completePermissionAccept ? "다음" : "허용"}
          color="mainWhite"
          onPress={handlePress}
        />
      </ButtonContainer>
    </>
  );
};

const PermissionList = styled.View`
  width: 100%;
  flex-direction: column;
  gap: 28;
`;

const ButtonContainer = styled.View`
  width: 100%;
  padding-inline: 23px;
`;

export default PermissionListSection;
