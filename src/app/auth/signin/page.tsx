"use client";

import Link from "next/link";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/ui/card";
import * as yup from "yup";
import { useFormik } from "formik";
import { toast } from "sonner";
import { PasswordInput } from "@/ui/password-input";
import { useAuth } from "@/stores/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components";

export default function Signin() {
  const router = useRouter();
  const onLogin = useAuth((state) => state.onLogin);

  const [isLoading, setIsLoading] = useState(false);

  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        await onLogin(values);
        toast.success("Login realizado com sucesso");
        router.push("/store");
      } catch (error) {
        toast.error("E-mail ou senha inválidos");
      } finally {
        setIsLoading(false);
      }
    },
  });

  const { values, handleChange, handleSubmit } = formik;
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Insira seu e-mail abaixo para fazer login na sua conta
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4" onSubmit={handleSubmit}>
          <div className="grid gap-2">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              value={values.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Senha</Label>
            </div>
            <PasswordInput
              id="password"
              name="password"
              placeholder="********"
              value={values.password}
              onChange={handleChange}
              required
            />
          </div>
          <Button
            type={isLoading ? "button" : "submit"}
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? <Spinner.Base /> : "Entrar"}
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          Não tem uma conta?{" "}
          <Link href="/auth/signup" className="underline">
            Cadastre-se
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
