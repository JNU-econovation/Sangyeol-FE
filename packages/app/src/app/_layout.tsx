import GlobalErrorFallback from "@entities/GlobalErrorFallback";
import ModalProvider from "@service/modal/provider";
import { NoticeBarProvider } from "@service/notice-bar";
import QueryProvider from "@service/query/provider";
import { ErrorBoundary } from "@suspensive/react";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import Toast from "react-native-toast-message";

export default function RootLayout() {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary fallback={GlobalErrorFallback} onReset={reset}>
          <QueryProvider>
            <NoticeBarProvider>
              <ModalProvider>
                <StatusBar barStyle={"dark-content"} />
                <Stack
                  screenOptions={{
                    headerShown: false,
                    contentStyle: {
                      backgroundColor: "white",
                    },
                  }}
                >
                  <Stack.Screen
                    name="(tabs)"
                    options={{
                      animation: "fade",
                    }}
                  />
                  <Stack.Screen name="index" />
                  <Stack.Screen name="login" />
                  <Stack.Screen
                    name="starter"
                    options={{
                      animation: "fade",
                    }}
                  />
                  <Stack.Screen
                    name="loginModal"
                    options={{
                      presentation: "modal",
                      headerShown: true,
                      headerTitle: "카카오 로그인",
                    }}
                  />
                  <Stack.Screen
                    name="webModal"
                    options={{
                      presentation: "modal",
                    }}
                  />
                  <Stack.Screen
                    name="report"
                    options={{
                      animation: "fade",
                      animationDuration: 100,
                    }}
                  />
                  <Stack.Screen
                    name="travel"
                    options={{
                      animation: "fade",
                      animationDuration: 100,
                    }}
                  />
                </Stack>
              </ModalProvider>
              <Toast />
            </NoticeBarProvider>
          </QueryProvider>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
