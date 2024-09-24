"use client";

import { Order } from "@/components";
import useFetch from "@/hooks/useFetch";
import { OrderProps } from "@/types/Order";
import { useParams } from "next/navigation";

export default function OrderDetails() {
  const { id } = useParams();
  const { data } = useFetch<OrderProps>(`/orders/${id}`);

  return (
    <div className="flex flex-col gap-5 p-5">
      <h1 className="text-2xl font-semibold">Pedido</h1>
      {data && (
        <>
          <Order.Summary {...data} />
          <div className="border rounded-md p-5">
            <h3 className="font-semibold mb-2">Itens Comprados</h3>
            {data.product_models.map((product) => (
              <Order.Items key={product.id} {...product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
