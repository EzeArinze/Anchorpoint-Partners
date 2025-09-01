import { Card, CardContent } from "@/components/ui/card";
import { Shield, TrendingUp, Globe, Users } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <div className="w-full max-w-6xl mx-auto px-6 py-20">
        {/* Hero Section */}
        <section className="grid gap-8 md:grid-cols-2 items-center mb-20 mt-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Empowering the Future of{" "}
              <span className="text-primary">Wealth</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We are a next-generation investment platform enabling individuals
              to grow their wealth through diversified opportunities in{" "}
              <span className="font-medium text-foreground">
                Retirement, Crude Oil, Cannabis, Ruby, Digital Assets, Financial
                planning
              </span>
              . Our mission is simple — make world-class investment options
              accessible, secure, and transparent.
            </p>
          </div>
          <div className="bg-gradient-to-tr from-primary/10 via-orange-100/40 dark:from-primary/20 dark:via-zinc-800 p-8 rounded-2xl shadow-sm">
            <h2 className="text-2xl font-semibold mb-3">Why Choose Us?</h2>
            <p className="text-muted-foreground">
              Whether you’re a first-time investor or building a global
              portfolio, our platform gives you the tools and security to grow
              confidently.
            </p>
          </div>
        </section>

        {/* Core Values */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">
            Our Core Values
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Shield,
                title: "Security First",
                desc: "Your investments are safeguarded with top-tier compliance and protection.",
              },
              {
                icon: TrendingUp,
                title: "Smart Growth",
                desc: "Maximize long-term returns through diversified asset exposure.",
              },
              {
                icon: Globe,
                title: "Global Access",
                desc: "Opportunities spanning both traditional and digital markets worldwide.",
              },
              {
                icon: Users,
                title: "Community Driven",
                desc: "A network built on transparency, trust, and shared success.",
              },
            ].map((item, i) => (
              <Card
                key={i}
                className="rounded-2xl shadow-sm transition hover:shadow-md hover:scale-[1.02]"
              >
                <CardContent className="flex flex-col items-center text-center gap-4 py-10">
                  <item.icon className="h-10 w-10 text-primary" />
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Mission / Vision */}
        <section className="grid gap-12 md:grid-cols-2 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
            <p className="text-muted-foreground leading-relaxed">
              The future of wealth lies in accessibility. By bridging
              traditional and digital investments, we provide everyone the
              opportunity to participate in markets once reserved for the elite.
            </p>
          </div>
          <div className="bg-gradient-to-r from-indigo-500/10 via-primary/5 to-orange-500/10 dark:from-indigo-600/20 dark:to-zinc-800 p-8 rounded-2xl shadow-sm">
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed">
              We’re committed to building trust and delivering long-term value
              by focusing on diversification, innovation, and transparency. Your
              success defines ours.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
