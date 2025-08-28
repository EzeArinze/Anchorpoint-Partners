"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import ImageSlider from "./slider";

export function Hero() {
  return (
    <div className="relative pt-20 sm:pt-28 md:pt-36 lg:pt-44 mt-4">
      {/* background */}
      <div className="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_100%,transparent_0%,var(--color-background)_75%)]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center sm:mx-auto lg:mr-auto lg:mt-0">
          {/* Top Badge Link */}
          <div className="hover:bg-background dark:hover:border-t-border bg-muted group mx-auto flex w-fit flex-wrap items-center gap-3 rounded-full border p-1 pl-4 shadow-md shadow-zinc-950/5 transition-colors duration-300 dark:border-t-white/5 dark:shadow-zinc-950">
            <span className="text-foreground text-xs sm:text-sm">
              Welcome to universal prime capital
            </span>
            <span className="dark:border-background hidden sm:block h-4 w-0.5 border-l bg-white dark:bg-zinc-700"></span>
            <div className="bg-background group-hover:bg-muted size-6 overflow-hidden rounded-full duration-500">
              <div className="flex w-12 -translate-x-1/2 duration-500 ease-in-out group-hover:translate-x-0">
                <span className="flex size-6">
                  <ArrowRight className="m-auto size-3" />
                </span>
                <span className="flex size-6">
                  <ArrowRight className="m-auto size-3" />
                </span>
              </div>
            </div>
          </div>

          {/* Title + Subtitle */}
          <h1 className="mt-6 sm:mt-8 text-balance text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.25rem] font-semibold leading-tight">
            A Diverse-Asset Investment Manager
          </h1>
          <p className="mx-auto mt-6 sm:mt-8 max-w-xl sm:max-w-2xl text-balance text-base sm:text-lg text-muted-foreground">
            Universal Prime Capital Trading is an institutional investment firm
            applying professional trading, venture investing, credit
            underwriting, and portfolio management to digital and traditional
            assets.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 sm:mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <div className="bg-foreground/10 rounded-[calc(var(--radius-xl)+0.125rem)] border p-0.5 w-full sm:w-auto">
              <Button
                asChild
                size="lg"
                className="w-full sm:w-auto rounded-xl px-5 text-base bg-teal-700 dark:text-white"
              >
                <Link href="/dashboard">
                  <span className="text-nowrap">Get Started</span>
                </Link>
              </Button>
            </div>
            <Button
              asChild
              size="lg"
              variant="ghost"
              className="w-full sm:w-auto h-10.5 rounded-xl px-5"
            >
              <Link href="/sign-in">
                <span className="text-nowrap">Create Account</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* App Screenshot / Slider */}
      <div className="mt-12 sm:mt-16 md:mt-20">
        <ImageSlider />
      </div>
    </div>
  );
}
