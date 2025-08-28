import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
      <div className="container mx-auto max-w-5xl px-4 py-12 flex flex-col items-center justify-center min-h-screen">
        {/* Hero Section */}
        <section className="text-center mb-16 mt-16">
          <h1 className="text-4xl font-bold mb-4">Help Center</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Need assistance? You’re in the right place. Whether you’re just
            getting started or have a specific question, we’re here to help you
            make the most of your investment journey.
          </p>
        </section>

        {/* Help Topics */}
        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 w-full">
          <Card className="rounded-2xl shadow-sm">
            <CardContent className="flex flex-col items-center text-center gap-3 py-8">
              <HelpCircle className="h-10 w-10 text-primary" />
              <h3 className="font-semibold text-lg">FAQs</h3>
              <p className="text-sm text-muted-foreground">
                Find quick answers to the most common questions about investing,
                withdrawals, and account setup.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-sm">
            <CardContent className="flex flex-col items-center text-center gap-3 py-8">
              <BookOpen className="h-10 w-10 text-primary" />
              <h3 className="font-semibold text-lg">Guides</h3>
              <p className="text-sm text-muted-foreground">
                Step-by-step resources to help you navigate our platform and
                make confident investment decisions.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-sm">
            <CardContent className="flex flex-col items-center text-center gap-3 py-8">
              <ShieldCheck className="h-10 w-10 text-primary" />
              <h3 className="font-semibold text-lg">Security</h3>
              <p className="text-sm text-muted-foreground">
                Learn how we protect your data and funds with industry-leading
                security measures.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-sm">
            <CardContent className="flex flex-col items-center text-center gap-3 py-8">
              <Mail className="h-10 w-10 text-primary" />
              <h3 className="font-semibold text-lg">Contact Support</h3>
              <p className="text-sm text-muted-foreground">
                Can’t find what you’re looking for? Reach out to our support
                team for personalized assistance.
              </p>
            </CardContent>
          </Card>
        </section>
        <section className="container mt-4">
          <h2 className="text-lg font-semibold text-center p-4">FAQ</h2>
          <Card className="rounded-2xl shadow-md">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Help & FAQ</CardTitle>
            </CardHeader>
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
