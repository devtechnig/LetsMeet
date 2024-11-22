// app/layout.tsx
import React from 'react';
import RootLayoutClient from './RootLayoutClient';
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LetsMeet",
  description: "Video calling App",
  icons: {
    icon: "/icons/logo.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html datatype='theme' lang="en" className={inter.className}>
      <body>
        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  );
}
