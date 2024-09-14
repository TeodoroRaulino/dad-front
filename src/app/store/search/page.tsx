"use client";

import { useCartStore } from "@/stores/cart";
import { ProductProps } from "@/types/Product";
import { Button } from "@/ui/button";
import Image from "next/image";

export default function ProductsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold pb-5">Products</h1>
      <ProductGrid products={products} />
    </div>
  );
}

interface ProductGridProps {
  products: ProductProps[];
}
const ProductGrid = ({ products }: ProductGridProps) => {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <div key={product.id} className="flex flex-col">
          <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
            <Image
              src={product.models[0].image}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                {product.name}
              </h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
                ${product.models[0].price.toFixed(2)}
              </p>
            </div>
            <Button
              variant="default"
              size="sm"
              onClick={() =>
                addItem({
                  id: product.models[0].id,
                  name: product.models[0].description,
                  price: product.models[0].price,
                  quantity: 1,
                })
              }
            >
              Add to Cart
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

const products: ProductProps[] = [
  {
    id: "1",
    name: "Wireless Headphones",
    category: "Electronics",
    models: [
      {
        id: "1",
        description: "Wireless Headphones",
        price: 249.99,
        stock: 10,
        image: "/iphone.png",
        productId: "1",
        product: {
          id: "1",
          name: "Wireless Headphones",
          category: "Electronics",
          models: [],
        },
      },
    ],
  },
  {
    id: "2",
    name: "Backpack",
    category: "Fashion",
    models: [
      {
        id: "2",
        description: "Backpack",
        price: 79.99,
        stock: 5,
        image: "/images/backpack.jpg",
        productId: "2",
        product: {
          id: "2",
          name: "Backpack",
          category: "Fashion",
          models: [],
        },
      },
    ],
  },
  {
    id: "3",
    name: "Smartwatch",
    category: "Electronics",
    models: [
      {
        id: "3",
        description: "Smartwatch",
        price: 199.99,
        stock: 3,
        image: "/smartwatch.jpg",
        productId: "3",
        product: {
          id: "3",
          name: "Smartwatch",
          category: "Electronics",
          models: [],
        },
      },
    ],
  },
  {
    id: "4",
    name: "Camera",
    category: "Electronics",
    models: [
      {
        id: "4",
        description: "Camera",
        price: 599.99,
        stock: 2,
        image: "/images/camera.jpg",
        productId: "4",
        product: {
          id: "4",
          name: "Camera",
          category: "Electronics",
          models: [],
        },
      },
    ],
  },
];
