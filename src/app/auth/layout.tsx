"use client";

import { Layout } from "@/components";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Layout.Auth>{children}</Layout.Auth>;
}
