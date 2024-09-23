"use client";

import useFetch from "@/hooks/useFetch";
import { ProductCompleteProps } from "@/types/Product";
import { useParams } from "next/navigation";
import { Product } from "@/components";

export default function ProductDetails() {
  const { id } = useParams();

  const { data } = useFetch<ProductCompleteProps>(
    id ? `/products/${id}` : null,
    {
      revalidateOnFocus: false,
    }
  );

  console.log(data);

  return (
    <>
      {data && (
        <Product.Details
          product={data.product}
          product_models={data.product_models}
        />
      )}
    </>
  );
}
