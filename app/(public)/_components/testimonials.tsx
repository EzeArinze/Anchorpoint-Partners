import { testimonials } from "@/constants/constant";

export default function WallOfLoveSection() {
  return (
    <section className="relative py-24 bg-gradient-to-br from-background via-muted/20 to-accent/10 overflow-hidden">
      {/* subtle grid background */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-20 dark:opacity-10" />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight">
            Trusted by Smart Investors
          </h2>
          <p className="mt-4 text-muted-foreground text-base md:text-lg leading-relaxed">
            From <span className="font-semibold">real estate</span> to{" "}
            <span className="font-semibold">crypto</span>,{" "}
            <span className="font-semibold">retirement planning</span>, and{" "}
            <span className="font-semibold">oil & gas</span> — our clients share
            how they built wealth and secured their financial futures.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="rounded-2xl border bg-background/70 backdrop-blur-md shadow-md hover:shadow-xl transition-all duration-300 p-8 flex flex-col justify-between text-left"
            >
              <p className="text-muted-foreground italic mb-6 text-lg leading-relaxed">
                “{t.quote}”
              </p>
              <div className="mt-auto border-t pt-4">
                <p className="font-semibold text-lg text-foreground">
                  {t.name}
                </p>
                <p className="text-sm text-muted-foreground">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
