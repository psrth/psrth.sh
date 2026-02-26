import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/lib/providers/theme-provider";

const soehne = localFont({
  src: [
    {
      path: "../../public/fonts/soehne-buch.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/soehne-kraftig.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/soehne-kraftig.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-soehne",
});

const tiempos = localFont({
  src: "../../public/fonts/tiempos-text-regular.woff2",
  weight: "400",
  variable: "--font-tiempos",
});

export const metadata: Metadata = {
  title: "vim / psrth.sh",
  description: "a minimalist, local storage backed scribbling app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${soehne.variable} ${tiempos.variable} antialiased font-soehne`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
