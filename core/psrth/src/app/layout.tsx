import type { Metadata } from "next";
import localFont from "next/font/local";
import { GoogleAnalytics } from "@next/third-parties/google";

import "@repo/ui/styles/globals.css";
import "@repo/ui/styles/syntax-highlighting.css";

import Header from "./components/header";
import Footer from "./components/footer";

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
  title: "home / psrth.sh",
  description:
    "Hey, I’m Parth. I’m a designer and engineer, and I build products for the internet.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID as string} />
      <body className={`${soehne.variable} ${tiempos.variable} antialiased`}>
        <Header />
        <main className="flex flex-col w-[100vw] lg:w-[1024px] min-h-[65vh] mx-auto mt-25 bg-white">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
