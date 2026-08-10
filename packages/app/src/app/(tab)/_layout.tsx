import { HouseSVG, MenuSVG } from "@icons";
import { COLOR_PALETTE } from "@shared/constants/colors";
import { Tabs } from "expo-router";
import { View } from "react-native";

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          paddingTop: 8,
          backgroundColor: "white",
          borderTopWidth: 0,
        },
        headerTransparent: true,
        tabBarInactiveTintColor: COLOR_PALETTE.gray900,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "홈",
          tabBarActiveTintColor: COLOR_PALETTE.primary,
          tabBarIcon: ({ focused }) => (
            <>
              {focused && (
                <View
                  style={{
                    width: 50,
                    height: 50,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: COLOR_PALETTE.primarySoft,
                    borderRadius: "100%",
                    position: "absolute",
                    top: 0,
                    transform: [{ translateY: -4 }],
                  }}
                />
              )}
              <HouseSVG color={COLOR_PALETTE.primary} />
            </>
          ),
        }}
      />
      <Tabs.Screen
        name="etc"
        options={{
          title: "더보기",
          tabBarActiveTintColor: COLOR_PALETTE.primary,
          tabBarIcon: ({ focused }) => (
            <>
              {focused && (
                <View
                  style={{
                    width: 50,
                    height: 50,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: COLOR_PALETTE.primarySoft,
                    borderRadius: "100%",
                    position: "absolute",
                    top: 0,
                    transform: [{ translateY: -4 }],
                  }}
                />
              )}
              <MenuSVG color={COLOR_PALETTE.primary} />
            </>
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
