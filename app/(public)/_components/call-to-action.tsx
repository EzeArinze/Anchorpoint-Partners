"use client";

import { Button } from "@/components/ui/button";

export function CallToAction() {
  return (
    <section className="py-24 bg-gradient-to-r from-accent/20 via-background to-accent/20">
      <div className="max-w-4xl mx-auto px-6 text-center">
        {/* Headline */}
        <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
          Ready to Start Growing Your Wealth?
        </h2>

        {/* Supporting text */}
        <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
          Choose the investment plan that matches your goals and take the first
          step toward financial freedom. Our team ensures your investments are
          secure and profitable.
        </p>

        {/* Button */}
        <Button
          size="lg"
          className="px-8 py-6 text-lg font-semibold rounded-2xl shadow-lg"
          variant={"link"}
        >
          Get Started Today
        </Button>
      </div>
    </section>
  );
}
