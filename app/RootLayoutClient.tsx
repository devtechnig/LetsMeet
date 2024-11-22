"use client";

import { ReactNode } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "./ThemeContext";
import { Toaster } from "@/components/ui/toaster";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import "react-datepicker/dist/react-datepicker.css";
import "./globals.css";

export default function RootLayoutClient({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider
      appearance={{
        layout: {
          socialButtonsVariant: "iconButton",
          logoImageUrl: "/icons/logo.png",
        },
      }}
    >
      <ThemeProvider> {/* Wrap with ThemeProvider */}
        <Toaster />
        {children}
      </ThemeProvider>
    </ClerkProvider>
  );
}