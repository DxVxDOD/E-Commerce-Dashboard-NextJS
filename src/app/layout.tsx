import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import ReduxProvider from "@/redux/Provider";
import ModalProvider from "@/providers/ModalProvider";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Admin Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html className={inter.className} lang="en">
        <body className={"h-screen w-screen"}>
          <ReduxProvider>
            <ModalProvider />
            <Toaster
              reverseOrder={false}
              position={"top-center"}/>
            {children}
          </ReduxProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
