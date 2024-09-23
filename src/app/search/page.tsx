"use client";

import { Product } from "@/components";
import useFetch from "@/hooks/useFetch";
import { ProductProps } from "@/types/Product";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/ui/card";
import { useSearchParams } from "next/navigation";

export default function ProductsPage() {
  const q = useSearchParams().get("q");

  const { data } = useFetch<ProductProps[]>(
    `/products?${q ? `search=${q}` : ""}`
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold pb-5">Products</h1>

      {data && data.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {data.map((product) => (
            <Product.Store key={product.product_model_id} {...product} />
          ))}
        </div>
      )}
      {!data ||
        (data.length === 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Nenhum produto encontrado</CardTitle>
              <CardDescription>
                Não foram encontrados produtos correspondentes à sua pesquisa.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Tente ajustar seus critérios de pesquisa ou adicione novos
                produtos.
              </p>
            </CardContent>
          </Card>
        ))}
    </div>
  );
}
