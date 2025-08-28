import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Banknote,
  BookCheck,
  MessageCircleMoreIcon,
  ShieldCheck,
} from "lucide-react";
import { ReactNode } from "react";

export default function WhyInvest() {
  return (
    <section className="bg-zinc-50 py-16 md:py-28 dark:bg-transparent">
      <div className="mx-auto max-w-5xl px-6">
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-balance text-4xl font-semibold lg:text-5xl">
            Why Invest With Us
          </h2>

          <h3 className="mt-2 text-2xl md:text-3xl font-semibold leading-snug text-teal-700">
            We stand as a prominent platform for diverse investments
          </h3>
          <p className="mt-4 text-muted-foreground">
            As a leading investment platform, we operate with a profound sense
            of responsibility towards our investors, clients, society, and the
            environment. Our commitment extends to developing best practices and
            industry standards across various investment sectors, including real
            estate, gold, crude oil, digital assets, and more. At Universal
            Prime Capital, we are proud to be an equal opportunity employer and
            a sustainability-focused community. Our operations adhere to the
            responsibilities outlined in our policies, reflecting our dedication
            to excellence in every facet of our diversified investment portfolio
          </p>
        </div>

        {/* Responsive Grid */}
        <div className="mx-auto mt-8 grid max-w-lg gap-6 text-center md:mt-16 md:max-w-3xl md:grid-cols-2 lg:max-w-full lg:grid-cols-3">
          <Card className="group shadow-zinc-950/5">
            <CardHeader className="pb-3">
              <CardDecorator>
                <ShieldCheck className="size-6 text-teal-700/60" aria-hidden />
              </CardDecorator>
              <h3 className="mt-6 font-medium">Secure first</h3>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                For Security, we use the latest technology for your convenience
                transacting.
              </p>
            </CardContent>
          </Card>

          <Card className="group shadow-zinc-950/5">
            <CardHeader className="pb-3">
              <CardDecorator>
                <MessageCircleMoreIcon
                  className="size-6 text-teal-700/60"
                  aria-hidden
                />
              </CardDecorator>
              <h3 className="mt-6 font-medium">24hr Support</h3>
            </CardHeader>
            <CardContent>
              <p className="mt-3 text-sm">
                You can always reach out to us when ever you want to, We are
                always here to help.
              </p>
            </CardContent>
          </Card>

          <Card className="group shadow-zinc-950/5">
            <CardHeader className="pb-3">
              <CardDecorator>
                <Banknote className="size-6 text-teal-700/60" aria-hidden />
              </CardDecorator>
              <h3 className="mt-6 font-medium">Quick Withdrawal</h3>
            </CardHeader>
            <CardContent>
              <p className="mt-3 text-sm">
                Our all retreats are treated spontaneously once requested, they
                are high maximum limits. are higher
              </p>
            </CardContent>
          </Card>

          <Card className="group shadow-zinc-950/5">
            <CardHeader className="pb-3">
              <CardDecorator>
                <BookCheck className="size-6 text-teal-700/60" aria-hidden />
              </CardDecorator>
              <h3 className="mt-6 font-medium">Legal Company</h3>
            </CardHeader>
            <CardContent>
              <p className="mt-3 text-sm">
                We are certified to operate investment business, we are legal
                and safe.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

export const CardDecorator = ({ children }: { children: ReactNode }) => (
  <div className="relative mx-auto size-36 duration-200 [--color-border:color-mix(in_oklab,var(--color-zinc-950)10%,transparent)] group-hover:[--color-border:color-mix(in_oklab,var(--color-zinc-950)20%,transparent)] dark:[--color-border:color-mix(in_oklab,var(--color-white)15%,transparent)] dark:group-hover:bg-white/5 dark:group-hover:[--color-border:color-mix(in_oklab,var(--color-white)20%,transparent)]">
    <div
      aria-hidden
      className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:24px_24px]"
    />
    <div
      aria-hidden
      className="bg-radial to-background absolute inset-0 from-transparent to-75%"
    />
    <div className="bg-background absolute inset-0 m-auto flex size-12 items-center justify-center border-l border-t">
      {children}
    </div>
  </div>
);
