"use client";

import { Layout } from "@/components";
import Component from "./components";

export default function Home() {
  return (
    <>
      <Layout.Header />

      <div className="container mx-auto p-6">
        <Component />
      </div>
    </>
  );
}
