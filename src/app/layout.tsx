'use client'

import "./globals.css";
import ReduxProvider from "@/lib/reduxProvider";
import { Gloock, Gochi_Hand, Pixelify_Sans } from "next/font/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
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

const pixel = Pixelify_Sans({
    weight: ['400', '500'],
    subsets: ['cyrillic', 'latin'],
    variable: '--font-pixel'
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
        className={`${gochi.variable} ${glook.variable} ${pixel.variable} antialiased`}>
          <ReduxProvider>
            <QueryClientProvider key={0} client={queryClient}>
              <RouteLoader />
                {children}
            </QueryClientProvider>
          </ReduxProvider>
      </body>
    </html>
  );
}
