import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Products } from "@/constants/constant";

export function InvestmentProducts() {
  return (
    <section
      className="bg-zinc-50 py-16 md:py-32 dark:bg-transparent"
      id="products"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-balance text-3xl font-semibold sm:text-4xl lg:text-5xl">
            Investment Products
          </h2>
        </div>

        {/* Cards */}
        <div className="mx-auto mt-10 grid gap-6 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
          {Products.map((product) => (
            <Card
              key={product.id}
              className="group shadow-zinc-950/5 hover:shadow-lg transition-shadow"
            >
              <CardHeader className="pb-3">
                {product.image && (
                  <div className="relative w-full h-40 rounded-lg overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                )}
                <h3 className="mt-4 font-semibold text-lg underline">
                  {product.title}
                </h3>
              </CardHeader>

              <CardContent>
                <p className="text-sm sm:text-base text-muted-foreground">
                  {product.small_description}
                </p>
              </CardContent>

              <CardFooter>
                <Link href={`/product/${product.slug}`}>
                  <Button variant="ghost" className="text-teal-700">
                    Learn More
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
