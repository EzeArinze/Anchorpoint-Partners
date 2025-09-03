import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import ReactQueryProvider from "@/lib/providers/react-query";
// import TawkScript from "@/components/tawk-script";

export const metadata: Metadata = {
  title: "Anchorpoint Partners",
  description:
    "Invest in real-estate, crypto, crude-oil, financial planning, retirement plan. e.t.c",
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
        {/* <TawkScript /> */}
      </body>
    </html>
  );
}
