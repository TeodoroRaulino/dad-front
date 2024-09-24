"use client";

import Link from "next/link";

import { Button } from "@/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/ui/card";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import * as yup from "yup";
import { useFormik } from "formik";
import { PasswordInput } from "@/ui/password-input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAuth } from "@/stores/auth";
import { useState } from "react";
import { Spinner } from "@/components";

type SignupProps = {
  redirectTo?: string;
};

export const Signup: React.FC<SignupProps> = ({ redirectTo }) => {
  const router = useRouter();
  const onSignup = useAuth((state) => state.onSignup);

  const [isLoading, setIsLoading] = useState(false);

  const schema = yup.object().shape({
    email: yup.string().email().required("O email é um campo obrigatório"),
    password: yup.string().required("A senha é um campo obrigatório"),
    password_confirmation: yup
      .string()
      .oneOf([yup.ref("password"), undefined], "As senhas devem ser iguais")
      .required("A confirmação de senha é um campo obrigatório"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      password_confirmation: "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        await onSignup(values);
        toast.success("Conta criada com sucesso");
        router.push(redirectTo ?? "/");
      } catch (error) {
        toast.error("Erro ao criar conta");
      } finally {
        setIsLoading(false);
      }
    },
  });

  const { values, handleChange, handleSubmit, errors, touched } = formik;
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Cadastrar</CardTitle>
        <CardDescription>
          Insira suas informações para criar uma conta
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4" onSubmit={handleSubmit}>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              value={values.email}
              onChange={handleChange}
              required
            />
            {errors.email && touched.email && (
              <span className="text-red-500 text-xs">{errors.email}</span>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Senha</Label>
            <PasswordInput
              id="password"
              name="password"
              placeholder="********"
              value={values.password}
              onChange={handleChange}
              required
            />
            {errors.password && touched.password && (
              <span className="text-red-500 text-xs">{errors.password}</span>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password_confirmation">Confirme sua senha</Label>
            <PasswordInput
              id="password_confirmation"
              name="password_confirmation"
              placeholder="********"
              value={values.password_confirmation}
              onChange={handleChange}
              required
            />
            {errors.password_confirmation && touched.password_confirmation && (
              <span className="text-red-500 text-xs">
                {errors.password_confirmation}
              </span>
            )}
          </div>
          <Button
            type={isLoading ? "button" : "submit"}
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? <Spinner.Base /> : "Criar conta"}
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          Já tem uma conta?{" "}
          <Link href="/auth/signin" className="underline">
            Entrar
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
