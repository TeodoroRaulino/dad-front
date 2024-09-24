"use client";

import { Section, Spinner } from "@/components";
import { useAuth } from "@/stores/auth";
import { useCartStore } from "@/stores/cart";
import { Button } from "@/ui/button";
import { Label } from "@/ui/label";
import { RadioGroup, RadioGroupItem } from "@/ui/radio-group";
import { Separator } from "@/ui/separator";
import {
  Banknote,
  CreditCard,
  Laptop,
  Minus,
  Plus,
  Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CheckoutPage() {
  const products = useCartStore((state) => state.items);
  const total = useCartStore((state) => state.total);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const isLogged = useAuth((state) => state.isLogged);
  const router = useRouter();

  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [mounted, setMounted] = useState(false);

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
                <li
                  key={product.id}
                  className="flex flex-col md:flex-row  items-start md:items-center justify-between"
                >
                  <div className="flex items-center gap-2 justify-between md:justify-start w-full">
                    <div className="flex gap-1 items-center">
                      <Laptop className="w-8 h-8  text-blue-500" />
                      <span>{product.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          updateQuantity(product.id, product.quantity - 1)
                        }
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span>{product.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          updateQuantity(product.id, product.quantity + 1)
                        }
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center w-full md:w-1/3">
                    <span className="font-semibold">
                      R$ {(product.price * product.quantity).toFixed(2)}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem(product.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </li>
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
            <Button type="submit" className="w-full mt-8">
              Finalizar Compra
            </Button>
          </Section>
        </div>
      </div>
    </div>
  );
}
