"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/ui/card";
import { Button } from "@//ui/button";
import { Badge } from "@//ui/badge";
import { ShoppingCart, Lock, ArrowLeft } from "lucide-react";

import { Auth } from "@/components";
import { useCartStore } from "@/stores/cart";
import Link from "next/link";

export default function Component() {
  const total = useCartStore((state) => state.total);

  const [activeTab, setActiveTab] = useState("signin");

  return (
    <div className=" bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold">
              Finalizar compra
            </CardTitle>
            <Badge variant="secondary">
              <Lock className="w-4 h-4 mr-1" />
              Segurança
            </Badge>
          </div>
          <CardDescription>
            É necessário fazer login para finalizar a compra.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <ShoppingCart className="w-6 h-6 text-primary mr-2" />
              <span className="text-lg font-semibold">
                Seu carrinho: R${total}
              </span>
            </div>
          </div>
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="signin">Entrar</TabsTrigger>
              <TabsTrigger value="signup">Nova conta</TabsTrigger>
            </TabsList>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <TabsContent value="signin">
                <Auth.SignIn redirectTo="/checkout" />
              </TabsContent>
              <TabsContent value="signup">
                <Auth.SignUp redirectTo="/checkout" />
              </TabsContent>
            </motion.div>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-start items-center">
          <Link href={"/search"}>
            <Button>
              Continuar comprando
              <ArrowLeft className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
