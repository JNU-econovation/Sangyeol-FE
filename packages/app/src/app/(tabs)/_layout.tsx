// import { mypageWebviewRef } from "@components/feature/screens/mypage/MypageHomeWebview";
import useRouteToBridge from "@hooks/feature/bridge/useRouteToBridge";
import QueryProvider from "@service/query/provider";
import {
  HeroBlockSVG,
  HeroSVG,
  HomeBlockSVG,
  HomeSVG,
  MapBlockSVG,
  MapSVG,
  MountainSVG,
  StoreSVG,
} from "@shared/ui/Icons";
import { useTokenStore } from "@store/secureStorage/useTokenStore";
import { COLORS } from "@styles/colorPalette";
import { Redirect, Tabs } from "expo-router";
import { WebView } from "react-native-webview";

export let mypageWebviewRef: React.RefObject<WebView<{}>> = null;

export default function TabLayout() {
  const { accessToken } = useTokenStore();
  const { ref, routeTo } = useRouteToBridge();

  mypageWebviewRef = ref;

  if (!accessToken) return <Redirect href="/starter" />;

  return (
    <QueryProvider>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: COLORS.primary,
          animation: "fade",
          tabBarStyle: {
            backgroundColor: COLORS.mainWhite,
          },
          sceneStyle: {
            backgroundColor: COLORS.mainWhite,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "홈",
            tabBarLabel: "홈",
            tabBarIcon: ({ focused }) =>
              focused ? (
                // <TouchableOpacity
                //   onPress={() => {
                //     router.dismissAll();
                //     router.replace("/(tabs)/home");
                //   }}
                // >
                <HomeBlockSVG />
              ) : (
                // </TouchableOpacity>
                <HomeSVG />
              ),
          }}
        />
        <Tabs.Screen
          name="sangyeol"
          options={{
            tabBarLabel: "산결",
            tabBarIcon: ({ focused }) =>
              focused ? <MountainSVG /> : <MountainSVG />,
          }}
        />
        <Tabs.Screen
          name="map"
          options={{
            tabBarLabel: "지도",
            tabBarIcon: ({ focused }) =>
              focused ? <MapBlockSVG /> : <MapSVG />,
          }}
        />
        <Tabs.Screen
          name="store"
          options={{
            tabBarLabel: "스토어",
            tabBarIcon: ({ focused }) =>
              focused ? <StoreSVG /> : <StoreSVG />,
          }}
        />
        <Tabs.Screen
          name="mypage"
          options={{
            tabBarLabel: "마이",
            tabBarIcon: ({ focused }) =>
              focused ? (
                // <TouchableOpacity
                //   onPress={() => {
                //     if (mypageWebviewRef?.current) {
                //       routeTo({
                //         routeType: "dismiss",
                //         url: "/my-page",
                //       });
                //     }
                //   }}
                // >
                <HeroBlockSVG />
              ) : (
                // </TouchableOpacity>
                <HeroSVG />
              ),
            animation: "fade",
          }}
        />
      </Tabs>
    </QueryProvider>
  );
}
