import { Card, CardContent } from "@/components/ui/card";
import { HelpCircle, BookOpen, Mail, ShieldCheck } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function HelpPage() {
  return (
    <div className="bg-zinc-50 dark:bg-transparent">
      <div className="container mx-auto max-w-6xl px-4 py-16 flex flex-col items-center justify-center min-h-screen">
        {/* Hero Section */}
        <section className="relative text-center mb-20 w-full mt-8">
          <div className="bg-white/70 dark:bg-zinc-900/50 backdrop-blur-md shadow-lg rounded-2xl p-10 max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
              Help Center
            </h1>
            <p className="text-lg text-muted-foreground">
              Need assistance? You’re in the right place. Whether you’re just
              getting started or have a specific question, we’re here to help
              you make the most of your investment journey.
            </p>
          </div>
        </section>

        {/* Help Topics */}
        <section className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 w-full">
          {[
            {
              icon: HelpCircle,
              title: "FAQs",
              desc: "Find quick answers to common questions about investing, withdrawals, and account setup.",
            },
            {
              icon: BookOpen,
              title: "Guides",
              desc: "Step-by-step resources to help you navigate our platform and make confident decisions.",
            },
            {
              icon: ShieldCheck,
              title: "Security",
              desc: "Learn how we protect your data and funds with industry-leading security measures.",
            },
            {
              icon: Mail,
              title: "Contact Support",
              desc: "Can’t find what you’re looking for? Reach out to our support team for personalized help.",
            },
          ].map((item, i) => (
            <Card
              key={i}
              className="rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <CardContent className="flex flex-col items-center text-center gap-4 py-10 px-6">
                <div className="p-4 rounded-full bg-gradient-to-br from-primary/20 to-blue-500/20">
                  <item.icon className="h-10 w-10 text-primary" />
                </div>
                <h3 className="font-semibold text-xl">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </CardContent>
            </Card>
          ))}
        </section>

        {/* FAQ Section (unchanged) */}
        <section className="container mt-12">
          <h2 className="text-lg font-semibold text-center p-4">FAQ</h2>
          <Card className="rounded-2xl shadow-md">
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="login">
                  <AccordionTrigger>How do I log in?</AccordionTrigger>
                  <AccordionContent>
                    You can log in using your email magic link or your preferred
                    social provider.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="password">
                  <AccordionTrigger>
                    I didn’t receive my magic link.
                  </AccordionTrigger>
                  <AccordionContent>
                    Please check your spam folder. If you still don’t see it,
                    try resending the link or use a different email.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="support">
                  <AccordionTrigger>
                    How can I contact support?
                  </AccordionTrigger>
                  <AccordionContent>
                    Visit our{" "}
                    <a href="/contact" className="text-primary underline">
                      Contact Page
                    </a>{" "}
                    and send us a message. We’ll get back to you within 24
                    hours.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
