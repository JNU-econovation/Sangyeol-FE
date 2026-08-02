import { QueryClientProvider } from "@tanstack/react-query";
import * as Clipboard from "expo-clipboard";
import { PropsWithChildren } from "react";
import { DevToolsBubble } from "react-native-react-query-devtools";
import queryClient from "../client";

export default function QueryProvider({ children }: PropsWithChildren) {
  const onCopy = async (text: string) => {
    try {
      await Clipboard.setStringAsync(text);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* <DevToolsBubble onCopy={onCopy} /> */}
    </QueryClientProvider>
  );
}
