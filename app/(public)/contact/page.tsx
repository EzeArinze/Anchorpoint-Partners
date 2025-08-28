import { Card, CardContent } from "@/components/ui/card";
import { socials } from "@/constants/constant";
import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-12 flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-4xl mt-16">
        <h1 className="mb-8 text-center text-3xl font-bold">Contact Us</h1>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
          {socials.map((social) => (
            <Link
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Card className="rounded-2xl shadow-md transition hover:shadow-lg hover:bg-muted/40">
                <CardContent className="flex flex-col items-center justify-center gap-3 py-8">
                  <social.icon className="h-10 w-10 text-primary" />
                  <span className="font-medium">{social.name}</span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
