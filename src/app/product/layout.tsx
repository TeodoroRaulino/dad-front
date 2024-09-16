"use client";

import { Layout } from "@/components";

export default function ProductLayout({
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
