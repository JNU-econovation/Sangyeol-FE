const appConfig = {
  expo: {
    name: "산결",
    slug: "sangyeol",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/splash-icon.png",
    splash: {
      image: "./assets/images/splash-icon.png",
      resizeMode: "cover",
    },
    scheme: "sangyeol",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      usesAppleSignIn: true,
      supportsTablet: true,
      bundleIdentifier: "com.geongyu09.sangyeol",
      infoPlist: {
        ITSAppUsesNonExemptEncryption: false,
      },
      config: {
        usesNonExemptEncryption: false,
      },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/splash-icon.png",
        backgroundColor: "#ffffff",
      },
      package: "com.geongyu09.sangyeol",
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: [
      "expo-splash-screen",
      "expo-apple-authentication",
      "expo-router",
      // "@react-native-voice/voice",
      [
        "@react-native-voice/voice",
        {
          microphonePermission: "마이크 접근 권한이 필요합니다.",
          speechRecognitionPermission: "음성 인식 권한이 필요합니다.",
        },
      ],
      [
        "expo-font",
        {
          fonts: [
            "./assets/fonts/Pretendard-Black.otf",
            "./assets/fonts/Pretendard-Bold.otf",
            "./assets/fonts/Pretendard-ExtraBold.otf",
            "./assets/fonts/Pretendard-ExtraLight.otf",
            "./assets/fonts/Pretendard-Light.otf",
            "./assets/fonts/Pretendard-Medium.otf",
            "./assets/fonts/Pretendard-SemiBold.otf",
            "./assets/fonts/Pretendard-Thin.otf",
          ],
        },
      ],
      [
        "expo-location",
        {
          locationAlwaysAndWhenInUsePermission:
            "$(PRODUCT_NAME)이 위치 정보를 항상 사용하도록 허용합니다.",
        },
      ],
      "expo-web-browser",
      [
        "expo-image-picker",
        {
          photosPermission:
            "$(PRODUCT_NAME)이 사진 라이브러리에 접근할 수 있도록 허용합니다.",
          cameraPermission:
            "$(PRODUCT_NAME)이 카메라에 접근할 수 있도록 허용합니다.",
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      router: {
        origin: false,
      },
      eas: {
        projectId: "771bd71e-9bd9-42bc-809c-d0207f8329d3",
      },
    },
    owner: "geongyu09",
  },
};

export default appConfig;
