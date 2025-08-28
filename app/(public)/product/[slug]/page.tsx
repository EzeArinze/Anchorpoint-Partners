// app/products/[slug]/page.tsx
import { Button } from "@/components/ui/button";
import { Products } from "@/constants/constant";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Params {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: Params) {
  const slug = (await params).slug;

  const product = Products.find((p) => p.slug === slug);

  if (!product) return notFound();

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex flex-col items-center mt-20">
        {/* Product Image */}
        <div className="w-full max-w-2xl">
          <Image
            src={product.image}
            alt={product.title}
            width={800}
            height={500}
            className="rounded-2xl object-cover w-full h-auto"
            priority
          />
        </div>

        {/* Product Info */}
        <div className="mt-8 text-center md:text-left max-w-2xl">
          <h1 className="text-2xl md:text-4xl font-bold">{product.title}</h1>
          <p className="mt-3 text-sm md:text-base text-muted-foreground">
            {product.small_description}
          </p>
          <div className="prose prose-sm md:prose-lg mt-6 text-justify leading-relaxed dark:text-muted-foreground">
            {product.description}
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-10">
          <Button asChild variant="outline" size="lg">
            <Link href="/#products">← Back to Product Section</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
