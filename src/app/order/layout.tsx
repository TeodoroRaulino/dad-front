"use client";

import { Layout } from "@/components";
import { useAuth } from "@/stores/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function OrderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isLogged = useAuth((state) => state.isLogged);
  const router = useRouter();

  useEffect(() => {
    if (!isLogged) {
      router.push("/");
      toast.error("Você não tem permissão para acessar essa página.");
    }
  }, [isLogged, router]);
  return (
    <div>
      <Layout.Header />
      <main>{children}</main>
    </div>
  );
}
