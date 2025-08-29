"use client";

import { Counter } from "./counter";

export default function StatsSection() {
  return (
    <section className="py-12 md:py-20">
      <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
        {/* Heading + Subheading */}
        <div className="relative z-10 mx-auto max-w-xl space-y-6 text-center">
          <h2 className="text-4xl font-medium lg:text-5xl">
            AnchorPoint Partners by the Numbers
          </h2>
          <p className="text-muted-foreground">
            From real estate and retirement plans to cannabis, crypto, oil &
            gas, and financial planning — AnchorPoint Partners empowers
            investors with diversified opportunities and long-term financial
            growth.
          </p>
        </div>

        {/* Stats */}
        <div className="grid gap-12 divide-y *:text-center md:grid-cols-3 md:gap-2 md:divide-x md:divide-y-0">
          <div className="space-y-4">
            <div className="text-5xl font-bold">
              <Counter value={10} />
              k+
            </div>
            <p>Global Investors</p>
          </div>
          <div className="space-y-4">
            <div className="text-5xl font-bold">
              $<Counter value={250} />
              M+
            </div>
            <p>Assets Under Management</p>
          </div>
          <div className="space-y-4">
            <div className="text-5xl font-bold">
              <Counter value={6} />
            </div>
            <p>Investment Verticals</p>
          </div>
        </div>
      </div>
    </section>
  );
}
