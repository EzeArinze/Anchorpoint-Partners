import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
import { PieChart, Shield, Users, TrendingUp } from "lucide-react";

export function CompanyOffers() {
  const offers = [
    {
      icon: PieChart,
      title: "Portfolio Management",
      description:
        "Professionally managed diversified portfolios tailored to your risk tolerance and investment goals.",
      features: [
        "Automated rebalancing",
        "Tax-loss harvesting",
        "Low-cost ETFs",
      ],
    },
    {
      icon: Shield,
      title: "Wealth Protection",
      description:
        "Comprehensive strategies to protect and preserve your wealth across market cycles.",
      features: ["Risk assessment", "Insurance planning", "Estate planning"],
    },
    {
      icon: Users,
      title: "Financial Advisory",
      description:
        "One-on-one guidance from certified financial planners to optimize your financial strategy.",
      features: ["Personal consultation", "Goal planning", "24/7 support"],
    },
    {
      icon: TrendingUp,
      title: "Growth Strategies",
      description:
        "Advanced investment strategies designed to maximize long-term growth potential.",
      features: [
        "Alternative investments",
        "Growth-focused funds",
        "Market analysis",
      ],
    },
  ];

  return (
    <section className="relative py-24 bg-gradient-to-br from-background via-muted/20 to-accent/10">
      {/* subtle grid background */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-30 dark:opacity-10" />

      <div className="relative max-w-5xl mx-auto px-6">
        {/* Section heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What We Offer</h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive investment solutions designed to help you build,
            protect, and grow your wealth.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
          {offers.map((offer, index) => (
            <Card
              key={index}
              className="group relative rounded-2xl border bg-background/60 backdrop-blur-sm shadow-sm transition-all duration-300 hover:shadow-xl hover:border-accent/40"
            >
              <CardHeader>
                <div className="mx-auto w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <offer.icon className="h-7 w-7 text-accent" />
                </div>
                <CardTitle className="text-lg font-semibold mb-2">
                  {offer.title}
                </CardTitle>
                <CardDescription className="text-sm leading-relaxed">
                  {offer.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                  {offer.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
                {/* <Button
                  variant="outline"
                  size="sm"
                  className="w-full bg-transparent group-hover:border-accent group-hover:text-accent transition-colors"
                >
                  Learn More
                </Button> */}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
