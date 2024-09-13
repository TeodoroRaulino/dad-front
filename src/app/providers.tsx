"use client";

import { Suspense } from "react";

import { Toaster } from "@/ui/toaster";
import { TooltipProvider } from "@/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { Spinner } from "@/components";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<Spinner.Base />}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <TooltipProvider>{children}</TooltipProvider>
        <Toaster />
      </ThemeProvider>
    </Suspense>
  );
}
