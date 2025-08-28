"use client";
import React from "react";
import { Hero } from "./hero";
import CryptoTicker from "./crypto-ticker";

export default function HeroSection() {
  return (
    <section className="overflow-hidden mx-auto max-w-6xl">
      {/* Background Gradient Decorations */}

      <div
        aria-hidden
        className="absolute inset-0 isolate hidden opacity-65 contain-strict lg:block"
      >
        <div className="w-140 h-320 -translate-y-87.5 absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,theme(colors.teal.300/.08)_0,theme(colors.teal.500/.02)_50%,theme(colors.teal.700/0)_80%)]" />

        <div className="h-320 absolute left-0 top-0 w-60 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,theme(colors.teal.200/.06)_0,theme(colors.teal.600/.02)_80%,transparent_100%)] [translate:5%_-50%]" />

        <div className="h-320 -translate-y-87.5 absolute left-0 top-0 w-60 -rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,theme(colors.teal.300/.04)_0,theme(colors.teal.700/.02)_80%,transparent_100%)]" />
      </div>

      {/* Hero Section */}
      <Hero />

      <CryptoTicker />
    </section>
  );
}
