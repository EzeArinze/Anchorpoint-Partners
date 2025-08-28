import { Card, CardContent } from "@/components/ui/card";
import { testimonials } from "@/constants/constant";

export default function WallOfLoveSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-3xl font-semibold">Customer Reviews</h2>
        </div>

        {/* Testimonials grid */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map(({ name, role, quote }, index) => (
            <Card key={index} className="h-full">
              <CardContent className="p-6 flex flex-col justify-between h-full">
                <div>
                  <h3 className="font-medium text-lg">{name}</h3>
                  <span className="text-teal-700 block text-sm mb-3">
                    {role}
                  </span>
                  <blockquote>
                    <p className="text-muted-foreground leading-relaxed">
                      {quote}
                    </p>
                  </blockquote>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
