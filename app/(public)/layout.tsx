import type { Metadata } from "next";

import { HeroHeader } from "./_components/header";
import FooterSection from "./_components/footer";

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
    <div
    // className={` `}
    >
      <header>
        <HeroHeader />
      </header>
      {children}
      <footer className="border-b bg-white pt-20 dark:bg-transparent">
        <FooterSection />
      </footer>
    </div>
  );
}
