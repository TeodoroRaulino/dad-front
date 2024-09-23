"use client";

import { Layout } from "@/components";
import { useAuth } from "@/stores/auth";

export default function Home() {
  const user = useAuth((state) => state.user);
  console.log(user);
  return (
    <>
      <Layout.Header />

      <div>
        <h1>Home</h1>

        {user ? <p>Olá, {user.email}</p> : <p>Você não está logado</p>}
      </div>
    </>
  );
}
