"use client";

import { Check, ChevronRight, ShoppingBag } from "lucide-react";
import { Button } from "@/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/ui/card";
import Image from "next/image";
import { OrderProps } from "@/types/Order";
import Link from "next/link";
import { useCartStore } from "@/stores/cart";
import { useEffect } from "react";
import useFetch from "@/hooks/useFetch";
import { Spinner } from "@/components";
import { useParams } from "next/navigation";

export default function CheckoutSuccess() {
  const clearCart = useCartStore((state) => state.clearCart);

  const { id } = useParams();
  const { data } = useFetch<OrderProps>(`/orders/${id}`);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl font-bold">
            Pedido Realizado com Sucesso!
          </CardTitle>
          <p className="text-muted-foreground">
            Obrigado pela sua compra. Seu pedido está sendo processado.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {data ? (
            <>
              <div className="rounded-lg border p-4">
                <h3 className="font-semibold mb-2">Resumo do Pedido</h3>
                <div className="flex justify-between text-sm">
                  <span>Número do Pedido:</span>
                  <span className="font-medium">{data.id}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Data do Pedido:</span>
                  <span className="font-medium">
                    {formatDate(data.created_at)}
                  </span>
                </div>
                <div className="flex justify-between text-sm"></div>
                <span>Valor Total:</span>{" "}
                <span className="font-medium">
                  R${data.total_price.toFixed(2)}
                </span>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Itens Comprados</h3>
                {data.product_models.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center space-x-4 border-b py-4"
                  >
                    <Image
                      src={"/smartwatch.jpg"}
                      alt={product.name}
                      width={80}
                      height={80}
                      className="rounded-md"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold">{product.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {product.description}
                      </p>
                      <div className="flex justify-between mt-2">
                        <span className="text-sm">
                          Quantidade: {product.quantity}
                        </span>
                        <span className="font-medium">
                          R${(product.price * product.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <Spinner.Base />
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link href="/search">
            <Button variant="outline">
              <ShoppingBag className="mr-2 h-4 w-4" />
              Continuar Comprando
            </Button>
          </Link>
          <Button>
            Ver Detalhes do Pedido
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
