"use client";

import { ReactNode } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "./ThemeContext";
import { Toaster } from "@/components/ui/toaster";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import "react-datepicker/dist/react-datepicker.css";
import "./globals.css";

interface RootLayoutClientProps {
  children: ReactNode;
}

export default function RootLayoutClient({ children }: RootLayoutClientProps) {
  return (
    <ClerkProvider
      appearance={{
        layout: {
          socialButtonsVariant: "iconButton",
          logoImageUrl: "/icons/logo.png", // Ensure this path is correct
        },
      }}
    >
      <ThemeProvider>
        <Toaster />
        {children}
      </ThemeProvider>
    </ClerkProvider>
  );
}
