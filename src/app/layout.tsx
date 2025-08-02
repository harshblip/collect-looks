'use client'

import type { Metadata } from "next";
import "./globals.css";
import ReduxProvider from "@/lib/reduxProvider";
import { Gloock, Gochi_Hand } from "next/font/google";
import { HydrationBoundary, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouteLoader } from "./components/layout/RouteLoader";

const glook = Gloock({
  weight: ['400'],
  subsets: ['cyrillic-ext'],
  variable: '--font-glook', // <- add variable
})

const gochi = Gochi_Hand({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-gochi', // <- add variable
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient()
  return (
    <html lang="en">
      <body
        className={`${gochi.variable} ${glook.variable} antialiased`}>
        <ReduxProvider>
          <QueryClientProvider client={queryClient}>
            <RouteLoader />
            {children}
          </QueryClientProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
