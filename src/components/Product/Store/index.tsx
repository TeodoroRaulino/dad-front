"use client";

import { useCartStore } from "@/stores/cart";
import { ProductProps } from "@/types/Product";
import { Button } from "@/ui/button";
import Image from "next/image";
import Link from "next/link";

export const Store: React.FC<ProductProps> = (product) => {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <div
      key={product.product_model_id}
      className="bg-background rounded-md shadow-md overflow-hidden flex flex-col justify-between"
    >
      <div>
        <Link href={`/product/${product.id}`} prefetch={false}>
          <Image
            src={product.url || "/placeholder.png"}
            width={300}
            height={300}
            alt={product.name}
            className="w-full h-48 object-contain"
          />
        </Link>

        <div className="p-4 flex-grow">
          <Link href={`/product/${product.id}`} prefetch={false}>
            <h3 className="text-lg font-medium mb-2">{product.name}</h3>
            <h4 className="text-sm text-gray-500 mb-2 line-clamp-2">
              {product.description}
            </h4>
          </Link>
        </div>
      </div>

      <div className="p-4 flex items-center justify-between">
        <span className="text-primary font-medium">
          R$ {product.price.toFixed(2)}
        </span>
        <Button
          size="sm"
          onClick={(event) => {
            event.stopPropagation();
            addItem({
              id: product.product_model_id,
              name: product.name,
              description: product.description,
              price: product.price,
              quantity: 1,
              url: product.url,
            });
          }}
        >
          Adicionar ao carrinho
        </Button>
      </div>
    </div>
  );
};
