import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import ReactQueryProvider from "@/lib/providers/react-query";

export const metadata: Metadata = {
  title: "Universal prime capital",
  description: "Invest in real-estate, crypto, crude-oil, gold, ruby's. e.t.c",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NuqsAdapter>
            <ReactQueryProvider>{children}</ReactQueryProvider>
          </NuqsAdapter>
        </ThemeProvider>
        <Toaster closeButton={true} position="top-center" />
      </body>
    </html>
  );
}
