"use client";

import { NextUIProvider } from "@nextui-org/react";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "./_components/Header";
export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
    <NextUIProvider>
      <Header />
      {children}
    </NextUIProvider>
    </ClerkProvider>
  );
}
