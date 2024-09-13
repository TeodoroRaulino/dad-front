"use client";

import { Suspense, useEffect, useState } from "react";

import { Toaster } from "@/ui/toaster";
import { TooltipProvider } from "@/ui/tooltip";
import { SWRConfig } from "swr";
import { ThemeProvider } from "@/components/theme-provider";
import { Spinner } from "@/components";

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <SWRConfig>
      <Suspense fallback={<Spinner.Base />}>
        {mounted ? (
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <TooltipProvider>{children}</TooltipProvider>
            <Toaster />
          </ThemeProvider>
        ) : (
          <Spinner.Base />
        )}
      </Suspense>
    </SWRConfig>
  );
}
