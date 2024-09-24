import { OrderStatus } from "@/types/Order";

export function getStatusVariant(
  status: OrderStatus
):
  | "warning"
  | "success"
  | "default"
  | "secondary"
  | "destructive"
  | "outline"
  | null
  | undefined {
  switch (status) {
    case "pending":
      return "warning";
    case "finished":
      return "success";
    default:
      return "default";
  }
}
