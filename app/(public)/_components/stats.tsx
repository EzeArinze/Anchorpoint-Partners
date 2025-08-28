"use client";

import { Card } from "@/components/ui/card";
import Image from "next/image";
import { Counter } from "./counter";

export default function StatsSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl space-y-12 px-4 sm:px-6 lg:px-8 text-center">
        {/* Image */}
        <div className="w-full max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-xl">
          <Image
            src="/images/team-presenting.webp"
            alt="Business meeting"
            width={1600}
            height={900}
            className="object-cover w-full h-56 sm:h-72 md:h-[28rem] lg:h-[32rem]"
            priority
          />
        </div>

        {/* Heading */}
        <div className="max-w-3xl mx-auto space-y-4">
          <h2 className="text-balance text-3xl sm:text-4xl lg:text-5xl font-semibold">
            Check Out Our Numbers
          </h2>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold leading-snug text-teal-700">
            We pride ourselves on how far we have gone{" "}
            <br className="hidden md:block" />
            and we want you to join us.
          </h3>
        </div>

        {/* Stats */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 md:gap-10 lg:gap-14">
          <Card className="border-2 rounded-2xl p-6 sm:p-8 shadow-sm">
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold">
              <Counter value={1464397} />+
            </div>
            <p className="mt-2 text-sm sm:text-base text-muted-foreground">
              Registered Users
            </p>
          </Card>

          <Card className="border-2 rounded-2xl p-6 sm:p-8 shadow-sm">
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold">
              <Counter value={9000000} />+
            </div>
            <p className="mt-2 text-sm sm:text-base text-muted-foreground">
              Transactions
            </p>
          </Card>

          <Card className="border-2 rounded-2xl p-6 sm:p-8 shadow-sm">
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold">
              $<Counter value={12} /> Billion+
            </div>
            <p className="mt-2 text-sm sm:text-base text-muted-foreground">
              Invested
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}
