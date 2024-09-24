import { OrderProps } from "@/types/Order";
import { Badge } from "@/ui/badge";
import { getStatusVariant } from "@/utils/badgeStatusVariant";
import { formatDate } from "@/utils/formatDate";

export const Summary: React.FC<OrderProps> = ({
  id,
  created_at,
  total_price,
  status,
}) => {
  return (
    <div className="rounded-lg border p-4 flex flex-col gap-1">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold mb-2">Resumo do Pedido</h3>
        <Badge variant={getStatusVariant(status)}>{status}</Badge>
      </div>
      <div className="flex justify-between text-sm">
        <span>Número do Pedido:</span>
        <span className="font-medium">{id}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span>Data do Pedido:</span>
        <span className="font-medium">{formatDate(created_at)}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span>Valor Total:</span>{" "}
        <span className="font-medium">R${total_price.toFixed(2)}</span>
      </div>
    </div>
  );
};
