import { Card, CardContent } from "@/components/ui/card";
import { Shield, TrendingUp, Globe, Users } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12 bg-zinc-50 dark:bg-transparent">
      <div className="w-full max-w-5xl mt-16">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">About Us</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            We are a next-generation investment platform empowering individuals
            to grow their wealth through diversified opportunities in{" "}
            <span className="font-semibold text-foreground">
              Gold, Crude Oil, Medical Cannabis, Ruby, Digital Assets, and NFTs
            </span>
            . Our mission is to make world-class investment options accessible,
            secure, and transparent.
          </p>
        </section>

        {/* Core Values */}
        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-16">
          <Card className="rounded-2xl shadow-sm">
            <CardContent className="flex flex-col items-center text-center gap-3 py-8">
              <Shield className="h-10 w-10 text-primary" />
              <h3 className="font-semibold text-lg">Security First</h3>
              <p className="text-sm text-muted-foreground">
                We prioritize the safety of your investments with
                industry-leading compliance and data protection.
              </p>
            </CardContent>
          </Card>
          <Card className="rounded-2xl shadow-sm">
            <CardContent className="flex flex-col items-center text-center gap-3 py-8">
              <TrendingUp className="h-10 w-10 text-primary" />
              <h3 className="font-semibold text-lg">Smart Growth</h3>
              <p className="text-sm text-muted-foreground">
                Diversify across traditional and emerging assets to maximize
                long-term returns.
              </p>
            </CardContent>
          </Card>
          <Card className="rounded-2xl shadow-sm">
            <CardContent className="flex flex-col items-center text-center gap-3 py-8">
              <Globe className="h-10 w-10 text-primary" />
              <h3 className="font-semibold text-lg">Global Access</h3>
              <p className="text-sm text-muted-foreground">
                From precious metals to digital assets, gain exposure to
                opportunities worldwide.
              </p>
            </CardContent>
          </Card>
          <Card className="rounded-2xl shadow-sm">
            <CardContent className="flex flex-col items-center text-center gap-3 py-8">
              <Users className="h-10 w-10 text-primary" />
              <h3 className="font-semibold text-lg">Community Driven</h3>
              <p className="text-sm text-muted-foreground">
                Join a growing network of investors who believe in transparency
                and shared success.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Mission / Vision */}
        <section className="text-center max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Our Vision & Our Mission</h2>
          <p className="text-muted-foreground mb-6">
            We believe that the future of wealth lies in accessibility. By
            bridging traditional and digital investments, we give everyone the
            chance to participate in markets once reserved for the elite.
          </p>
          <p className="text-muted-foreground">
            We aim to build trust and long-term value for our investors through
            diversification, innovation, and a commitment to transparency. Your
            success is our success.
          </p>
        </section>
      </div>
    </div>
  );
}
