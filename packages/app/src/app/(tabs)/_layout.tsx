import QueryProvider from "@service/query/provider";
import {
  CommunitySVG,
  HeroBlockSVG,
  HeroSVG,
  HomeBlockSVG,
  HomeSVG,
  MapBlockSVG,
  MapSVG,
  StoreSVG,
} from "@shared/ui/Icons";
import { useTokenStore } from "@store/secureStorage/useTokenStore";
import { COLORS } from "@styles/colorPalette";
import { Redirect, Tabs } from "expo-router";

export default function TabLayout() {
  const { accessToken } = useTokenStore();

  if (!accessToken) return <Redirect href="/starter" />;

  return (
    <QueryProvider>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: COLORS.primary,
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
              focused ? <HomeBlockSVG /> : <HomeSVG />,
          }}
        />
        <Tabs.Screen
          name="community"
          options={{
            tabBarLabel: "커뮤니티",
            tabBarIcon: ({ focused }) =>
              focused ? <CommunitySVG /> : <CommunitySVG />,
          }}
        />
        <Tabs.Screen
          name="map"
          options={{
            title: "지도",
            tabBarIcon: ({ focused }) =>
              focused ? <MapBlockSVG /> : <MapSVG />,
          }}
        />
        <Tabs.Screen
          name="store"
          options={{
            title: "스토어",
            // tabBarLabel: "스토어",
            tabBarIcon: ({ focused }) =>
              focused ? <StoreSVG /> : <StoreSVG />,
          }}
        />
        <Tabs.Screen
          name="mypage"
          options={{
            tabBarLabel: "마이",
            tabBarIcon: ({ focused }) =>
              focused ? <HeroBlockSVG /> : <HeroSVG />,
          }}
        />
      </Tabs>
    </QueryProvider>
  );
}
