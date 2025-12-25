"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import * as React from "react";

// This is a simple wrapper around "next-themes" which handles
// the switching between Dark Mode and Light Mode automatically.
export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
