const appConfig = {
  expo: {
    name: "산결",
    slug: "sangyeol",
    version: "0.0.1",
    orientation: "portrait",
    icon: "./assets/images/App_Icon.png",
    scheme: "sangyeol",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      usesAppleSignIn: true,
      supportsTablet: true,
      bundleIdentifier: "com.geongyu09.sangyeol",
      infoPlist: {
        ITSAppUsesNonExemptEncryption: false,
        LSApplicationQueriesSchemes: ["kakaoplus", "kakaotalk"],
      },
      config: {
        usesNonExemptEncryption: false,
      },
    },
    android: {
      softwareKeyboardLayoutMode: "pan",
      adaptiveIcon: {
        foregroundImage: "./assets/images/App_Icon.png",
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
      "expo-maps",
      "expo-secure-store",
      [
        "expo-splash-screen",
        {
          // image: "./assets/images/App_Icon.png",
          image: "./assets/images/Splash_Image.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff",
        },
      ],
      "expo-apple-authentication",
      "expo-router",
      // naver map
      [
        "@mj-studio/react-native-naver-map",
        {
          client_id: process.env.EXPO_PUBLIC_NAVER_KEY,
        },
      ],
      [
        "expo-build-properties",
        {
          android: {
            extraMavenRepos: ["https://repository.map.naver.com/archive/maven"],
          },
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
          locationAlwaysPermission:
            "$(PRODUCT_NAME)이 위치 정보를 항상 사용하도록 허용합니다.",
          isAndroidForegroundServiceEnabled: true,
          isAndroidBackgroundLocationEnabled: true,
          isIosBackgroundLocationEnabled: true,
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
      [
        "expo-sqlite",
        {
          enableFTS: true,
          useSQLCipher: true,
          android: {
            // Override the shared configuration for Android
            enableFTS: false,
            useSQLCipher: false,
          },
          ios: {
            // You can also override the shared configurations for iOS
            customBuildFlags: [
              "-DSQLITE_ENABLE_DBSTAT_VTAB=1 -DSQLITE_ENABLE_SNAPSHOT=1",
            ],
          },
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
    },
    updates: {
      url: "https://u.expo.dev/771bd71e-9bd9-42bc-809c-d0207f8329d3",
    },
    runtimeVersion: {
      policy: "appVersion",
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
