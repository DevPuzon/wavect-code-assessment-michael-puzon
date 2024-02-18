import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Web3ModalProvider } from "~/context/web3modal.context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Example DApp",
  description: "Example DApp",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Web3ModalProvider>{children}</Web3ModalProvider> 
      </body>
    </html>
  );
}
