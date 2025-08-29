import type { Metadata } from "next";
import { ReactNode } from "react";
// import "../globals.css";

export const metadata: Metadata = {
  title: "Anchorpoint Partners | Sign-in",
  description: "Sign-in page for Anchorpoint Partners",
};

export default function AuthLayout({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}
