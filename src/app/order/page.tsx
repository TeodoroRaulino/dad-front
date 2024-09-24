"use client";

import useFetch from "@/hooks/useFetch";
import OrderTable from "./componets/table";
import { OrderProps } from "@/types/Order";

export default function OrderPage() {
  const { data } = useFetch<OrderProps[]>("/orders");
  return (
    <div className="flex flex-col gap-5 p-5">
      <h1 className="text-2xl font-semibold">Pedidos</h1>
      {data && <OrderTable orders={data} />}
    </div>
  );
}
