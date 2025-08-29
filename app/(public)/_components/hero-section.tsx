import { buttonVariants } from "@/components/ui/button";
import { ArrowRight, TrendingUp } from "lucide-react";
import { AppComponent } from "./hero";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5">
      {/* Background overlay image */}
      <div className="absolute inset-0 bg-[url('/images/investment.jpg')] bg-cover bg-center opacity-10" />

      <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-28 lg:pt-40 text-center">
        <div className="relative z-10 mx-auto max-w-3xl">
          {/* Heading */}
          <h1 className="text-balance text-3xl font-bold leading-snug md:text-4xl lg:text-5xl">
            Build Your
            <span className="text-accent"> Financial Future</span>
            <br />
            With Confidence
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:text-lg lg:text-xl">
            Professional investment management and personalized financial
            strategies to help you achieve your long-term wealth goals.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              className={buttonVariants({
                size: "lg",
                className: "`px-6 py-3`",
              })}
              href={"/dashboard"}
            >
              Start Investing
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>

            <Link
              className={buttonVariants({
                variant: "outline",
                size: "lg",
                className: "px-6 py-3 bg-transparent",
              })}
              href={"/sign-in"}
            >
              Create Account
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* App Preview */}
        <div aria-hidden className="relative mx-auto mt-16 max-w-5xl text-left">
          <div className="mx-auto w-full max-w-xl lg:max-w-3xl rounded-[2rem] border bg-background/60 p-2 shadow-xl backdrop-blur-2xl dark:bg-white/5">
            <div className="overflow-hidden rounded-[1.5rem] border bg-background shadow-md">
              <AppComponent />
              <div className="bg-muted rounded-b-[1.5rem] p-4 dark:bg-white/5"></div>
            </div>
          </div>

          {/* decorative radial pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] mix-blend-overlay [background-size:16px_16px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] dark:opacity-5"></div>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 flex flex-col items-center justify-center gap-6 text-sm text-muted-foreground sm:flex-row sm:gap-12">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-500" />
            <span>Daily Returns</span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-500" />
            <span>Instant Withdrawals</span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-500" />
            <span>24/7 Support</span>
          </div>
        </div>
      </div>
    </section>
  );
}
