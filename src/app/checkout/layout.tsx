"use client";

import { Layout } from "@/components";

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Layout.Checkout />
      <main>{children}</main>
    </div>
  );
}
