"use client";

import { Card, CardContent } from "@/ui/card";
import { Badge } from "@/ui/badge";
import Image from "next/image";
import { ProductProps } from "@/types/Product";
import useFetch from "@/hooks/useFetch";
import { ItemCard } from "./ItemCard";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";

type ProductResponse = {
  expensive_products: ProductProps[];
  category_products: ProductProps[];
};
export default function Component() {
  const { data: products } = useFetch<ProductResponse>("/products/home");
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay()]);

  return (
    <>
      {products && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card className="col-span-1 md:col-span-2 bg-zinc-900 border-none">
              <Link href={`/product/${products.expensive_products[0].id}`}>
                <CardContent className="p-0 relative">
                  <Image
                    src={
                      products.expensive_products[0].url || "/placeholder.png"
                    }
                    alt={products.expensive_products[0].name}
                    width={300}
                    height={300}
                    className="w-full h-48 md:h-[400px] object-cover"
                  />
                  <Badge className="absolute bottom-4 left-4 bg-zinc-800 text-white">
                    {products.expensive_products[0].name}{" "}
                    <span className="ml-2 text-blue-400">
                      R${products.expensive_products[0].price} BRL
                    </span>
                  </Badge>
                </CardContent>
              </Link>
            </Card>

            <div className="space-y-4">
              {products.expensive_products.slice(1, 3).map((product) => (
                <ItemCard key={product.id} {...product} />
              ))}
            </div>
          </div>

          <div className="relative">
            <div ref={emblaRef} className="overflow-hidden">
              <div className="flex">
                {products.category_products.map((product) => (
                  <div
                    key={product.id}
                    className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.33%] px-2"
                  >
                    <ItemCard key={product.id} {...product} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
