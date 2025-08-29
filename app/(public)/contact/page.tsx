import { Card, CardContent } from "@/components/ui/card";
import { socials } from "@/constants/constant";
import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="relative min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <div className="container mx-auto max-w-5xl px-6 py-20">
        {/* Hero Section */}
        <div className="text-center mb-16 mt-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Let’s Connect</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have questions, ideas, or opportunities? Reach out through any of
            our platforms below — we’d love to hear from you.
          </p>
        </div>

        {/* Social Cards */}
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4 mb-20">
          {socials.map((social) => (
            <Link
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Card className="rounded-2xl border border-transparent shadow-sm transition hover:shadow-md hover:scale-[1.02] hover:border-primary/20">
                <CardContent className="flex flex-col items-center justify-center gap-3 py-10">
                  <social.icon className="h-10 w-10 text-primary" />
                  <span className="font-medium">{social.name}</span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Call To Action */}
        <div className="bg-gradient-to-r from-primary/10 via-orange-100/40 dark:from-primary/20 dark:via-zinc-800 p-10 rounded-2xl shadow-sm text-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-3">
            Have a project in mind?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            We’re always excited to collaborate and explore new opportunities.
            Drop us a message and let’s build the future together.
          </p>
        </div>
      </div>
    </div>
  );
}
