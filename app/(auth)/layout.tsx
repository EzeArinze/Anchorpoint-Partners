import type { Metadata } from "next";
import { ReactNode } from "react";
// import "../globals.css";

export const metadata: Metadata = {
  title: "Universal prime capital | Sign-in",
  description: "Sign-in page for Universal prime capital",
};

export default function AuthLayout({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}
