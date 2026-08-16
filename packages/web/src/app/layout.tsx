import ModalProvider from "@service/modal/provider";
import { StackLinkProvider } from "stack-link";
import TanstackQueryProvider from "@shared/components/composites/TanstackQueryProvider";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import GlobalBridgeListener from "@modules/features/bridgeListener/GlobalBridgeListener";

export const metadata: Metadata = {
  title: "산악구조",
  description: "New Project",
};

const font = localFont({
  src: [
    {
      path: "../../public/fonts/Pretendard-Black.woff2",
      weight: "900",
      style: "normal",
    },
    {
      path: "../../public/fonts/Pretendard-ExtraBold.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "../../public/fonts/Pretendard-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/Pretendard-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/Pretendard-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/Pretendard-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Pretendard-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/Pretendard-ExtraLight.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../public/fonts/Pretendard-Thin.woff2",
      weight: "100",
      style: "normal",
    },
  ],
});

const NODE_ENV = process.env.NODE_ENV;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={font.className}>
      <body className="select-none">
        <TanstackQueryProvider>
          <StackLinkProvider>
            <ModalProvider>
              {children}
              <GlobalBridgeListener />
            </ModalProvider>
          </StackLinkProvider>
        </TanstackQueryProvider>
        {NODE_ENV === "development" && (
          <script src="http://localhost:3002/devtools-client.js"></script>
        )}
      </body>
    </html>
  );
}
