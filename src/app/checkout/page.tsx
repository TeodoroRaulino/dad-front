"use client";

import { Section, Spinner } from "@/components";
import { checkout } from "@/services/api/orders";
import { useAuth } from "@/stores/auth";
import { useCartStore } from "@/stores/cart";
import { CheckoutProps } from "@/types/Order";
import { Button } from "@/ui/button";
import { Label } from "@/ui/label";
import { RadioGroup, RadioGroupItem } from "@/ui/radio-group";
import { Separator } from "@/ui/separator";
import { Banknote, CreditCard } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/ui/card";
import { Badge } from "@/ui/badge";
import { formatPrice } from "@/utils/formatPrice";

export default function CheckoutPage() {
  const products = useCartStore((state) => state.items);
  const total = useCartStore((state) => state.total);
  const isLogged = useAuth((state) => state.isLogged);
  const user = useAuth((state) => state.user);
  const router = useRouter();

  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);

  const onCheckout = async () => {
    setLoading(true);
    const data: CheckoutProps = {
      user_id: user?.id as number,
      product_models: products.map((product) => ({
        id: product.id,
        quantity: product.quantity,
      })),
    };

    try {
      const response = await checkout(data);
      router.push(`/checkout/success/${response.id}`);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isLogged) router.push("/checkout/auth");
    if (mounted && products.length === 0) router.push("/");
  }, [products, router, mounted, isLogged]);

  if (!mounted || products.length === 0 || !isLogged) return <Spinner.Base />;

  return (
    <div className="min-h-screen">
      <div className="container mx-auto p-6">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600">
            Acme Inc Checkout
          </h1>
        </header>
        <div className="grid md:grid-cols-2 gap-8">
          <Section title="Resumo do pedido">
            <ul className="space-y-4">
              {products.map((product) => (
                <ProductItem key={product.id} {...product} />
              ))}
            </ul>
            <Separator className="my-4" />
            <div className="flex justify-between font-semibold text-lg">
              <span>Total:</span>
              <span>R$ {total}</span>
            </div>
          </Section>
          <Section title="Método de pagamento">
            <RadioGroup
              value={paymentMethod}
              onValueChange={setPaymentMethod}
              className="space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="credit-card" id="credit-card" />
                <Label htmlFor="credit-card" className="flex items-center">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Cartão de Crédito
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="bank-transfer" id="bank-transfer" />
                <Label htmlFor="bank-transfer" className="flex items-center">
                  <Banknote className="w-4 h-4 mr-2" />
                  Transferência Bancária
                </Label>
              </div>
            </RadioGroup>
            <Button
              onClick={onCheckout}
              disabled={loading}
              className="w-full mt-8"
            >
              Finalizar Compra
              {loading && <Spinner.Base />}
            </Button>
          </Section>
        </div>
      </div>
    </div>
  );
}

interface ProductItemProps {
  quantity: number;
  name: string;
  description: string;
  price: number;
  url: string;
}

const ProductItem = ({
  quantity,
  name,
  description,
  price,
  url,
}: ProductItemProps) => (
  <Card className="border-none mb-2">
    <CardContent className="p-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Image
            src={url || "/placeholder.png"}
            alt={name}
            width={48}
            height={48}
            className="rounded-md"
          />
          <Badge
            className="absolute -top-2 -left-2 bg-zinc-700 text-white w-6 h-6 flex items-center justify-center rounded-full"
            variant="secondary"
          >
            {quantity}
          </Badge>
        </div>
        <div>
          <h3 className="font-semibold">{name}</h3>
          <p className="text-sm text-gray-400">{description}</p>
        </div>
      </div>
      <div className="text-white font-semibold">{formatPrice(price)}</div>
    </CardContent>
  </Card>
);
