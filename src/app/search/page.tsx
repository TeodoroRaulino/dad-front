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

export default function ProductsPage() {
  const { data } = useFetch<ProductProps[]>("/products");
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold pb-5">Products</h1>

      {data && data.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {data.map((product) => (
            <Product.Store key={product.id} {...product} />
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
