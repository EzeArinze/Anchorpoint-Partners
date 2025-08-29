import type { Metadata } from "next";

import FooterSection from "./_components/footer";
import { HeroHeader } from "./_components/header";

export const metadata: Metadata = {
  title: "Anchorpoint Partners",
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
      <HeroHeader />
      {children}
      <footer className="border-b bg-white pt-20 dark:bg-transparent">
        <FooterSection />
      </footer>
    </div>
  );
}
