const appConfig = {
  expo: {
    name: "산결",
    slug: "sangyeol",
    version: "0.0.1",
    orientation: "portrait",
    icon: "./assets/images/App_Icon.png",
    scheme: "sangyeol",
    userInterfaceStyle: "automatic",
    ios: {
      bundleIdentifier: "com.sansan.sangyeol",
    },
    android: {
      package: "com.sansan.sangyeol",
      adaptiveIcon: {
        foregroundImage: "./assets/images/App_Icon.png",
        backgroundColor: "#ffffff",
      },
      predictiveBackGestureEnabled: false,
    },
    web: {
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          backgroundColor: "#208AEF",
          image: "./assets/images/splash-icon.png",
          imageWidth: 76,
        },
      ],
      [
        "expo-location",
        {
          locationWhenInUsePermission:
            "$(PRODUCT_NAME)이 위치 정보를 사용하도록 허용합니다.",
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
      reactCompiler: true,
    },
    updates: {
      url: "https://u.expo.dev/771bd71e-9bd9-42bc-809c-d0207f8329d3",
    },
    runtimeVersion: {
      policy: "appVersion",
    },
    extra: {
      eas: {
        projectId: "771bd71e-9bd9-42bc-809c-d0207f8329d3",
      },
    },
    owner: "geongyu09",
  },
};

export default appConfig;
