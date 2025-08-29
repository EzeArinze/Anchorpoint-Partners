import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, UserPlus, Wallet, TrendingUp } from "lucide-react";

const steps = [
  {
    title: "Create Your Account",
    description: "Sign up in just a few minutes with your email or google.",
    icon: <UserPlus className="h-8 w-8 text-primary" />,
  },
  {
    title: "Fund Your Wallet",
    description: "Deposit securely using crypto or fiat options we support.",
    icon: <Wallet className="h-8 w-8 text-primary" />,
  },
  {
    title: "Choose a Plan",
    description: "Select from tailored investment packages to fit your goals.",
    icon: <TrendingUp className="h-8 w-8 text-primary" />,
  },
  {
    title: "Start Earning",
    description:
      "Watch your investments grow and withdraw 7 days after you invest.",
    icon: <ArrowRight className="h-8 w-8 text-primary" />,
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 bg-white dark:bg-neutral-950">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight">How It Works</h2>
          <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
            Getting started is easy. Follow these simple steps to begin your
            investment journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {steps.map((step, idx) => (
            <Card key={idx} className="relative text-center p-6">
              <CardHeader className="flex flex-col items-center">
                <div className="mb-4">{step.icon}</div>
                <CardTitle className="text-lg font-semibold">
                  {step.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  {step.description}
                </p>
              </CardContent>
              {idx !== steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 right-[-20px] transform -translate-y-1/2">
                  <ArrowRight className="h-5 w-5 text-muted-foreground" />
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
