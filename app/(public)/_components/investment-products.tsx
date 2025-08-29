import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Products } from "@/constants/constant";

export function InvestmentPackages() {
  return (
    <section className="py-24 bg-background/5" id="products">
      <div className="max-w-6xl mx-auto px-6 text-center space-y-12">
        {/* Section Heading */}
        <div className="space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold">
            Explore Our Investment Packages
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            Diversified investment options tailored to your financial goals.
            Choose the package that suits you best and start growing your wealth
            today.
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {Products.map((pkg) => (
            <div
              key={pkg.id}
              className="flex flex-col rounded-2xl border bg-background/60 backdrop-blur-sm shadow-sm hover:shadow-xl overflow-hidden"
            >
              {/* Image */}
              <Image
                src={pkg.image}
                alt={pkg.title}
                width={600}
                height={200}
                className="w-full h-44 object-cover"
              />

              {/* Content */}
              <div className="flex flex-col flex-1 justify-between p-6 text-center">
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold">{pkg.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {pkg.small_description}
                  </p>
                </div>

                <div className="mt-6">
                  <Link href={`/product/${pkg.slug}`}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full bg-transparent"
                    >
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
