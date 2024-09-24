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
import { OrderProps } from "@/types/Order";
import Link from "next/link";
import { useCartStore } from "@/stores/cart";
import { useEffect } from "react";
import useFetch from "@/hooks/useFetch";
import { Order, Spinner } from "@/components";
import { useParams } from "next/navigation";

export default function CheckoutSuccess() {
  const clearCart = useCartStore((state) => state.clearCart);

  const { id } = useParams();
  const { data } = useFetch<OrderProps>(`/orders/${id}`);

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
              <Order.Summary {...data} />
              <div>
                <h3 className="font-semibold mb-2">Itens Comprados</h3>
                {data.product_models.map((product) => (
                  <Order.Items key={product.id} {...product} />
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
          <Link href={`/order/${id}`}>
            <Button>
              Ver Detalhes do Pedido
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
