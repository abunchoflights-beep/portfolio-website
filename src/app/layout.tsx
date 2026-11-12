import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Preloader from "@/components/Preloader";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export const metadata: Metadata = {
  title: "David Cicery — Full-Stack & AI Engineer",
  description:
    "Full-stack & AI engineer and founder of xBeliv. Building production systems, autonomous agents and interfaces people love to use.",
  keywords: ["Next.js", "React", "AI Agents", "Full Stack", "xBeliv", "Developer Portfolio", "David Cicery"],
  authors: [{ name: "David Cicery" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-black">
      <body className={`${geistSans.variable} ${geistMono.variable} bg-black text-[#f5f5f7] antialiased`}>
        <Preloader />
        <CustomCursor />
        <div className="noise-overlay" aria-hidden />
        <SmoothScroll>
          <main className="relative z-10 min-h-screen">{children}</main>
        </SmoothScroll>
      </body>
    </html>
  );
}
