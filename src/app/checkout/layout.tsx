"use client";

import { Layout } from "@/components";

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Layout.Header />
      <main>{children}</main>
    </div>
  );
}
