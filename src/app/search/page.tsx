"use client";

import { useState, useEffect } from "react";
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
import { Button } from "@/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";

export default function ProductsPage() {
  const q = useSearchParams().get("q");
  const { data } = useFetch<ProductProps[]>(
    `/products?${q ? `search=${q}` : ""}`
  );
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const totalPages = data ? Math.ceil(data.length / itemsPerPage) : 0;

  useEffect(() => {
    setCurrentPage(1);
  }, [data]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedData = data?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold pb-5">Products</h1>

      {data && paginatedData && paginatedData.length > 0 && (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
            {paginatedData.map((product) => (
              <Product.Store key={product.product_model_id} {...product} />
            ))}
          </div>
          <div className="flex justify-center items-center mt-6 space-x-2">
            <Button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              variant="outline"
            >
              Anterior
            </Button>
            <Select
              value={currentPage.toString()}
              onValueChange={(value: any) => handlePageChange(Number(value))}
            >
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Page" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <SelectItem key={page} value={page.toString()}>
                      {page}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
            <Button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              variant="outline"
            >
              Próximo
            </Button>
          </div>
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
