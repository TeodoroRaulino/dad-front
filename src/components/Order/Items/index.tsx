import { ProductModelOrderProps } from "@/types/Order";
import Image from "next/image";

export const Items: React.FC<ProductModelOrderProps> = ({
  id,
  name,
  description,
  price,
  quantity,
  url,
}) => {
  return (
    <div key={id} className="flex items-center space-x-4 py-4">
      <Image
        src={url || "/placeholder.png"}
        alt={name}
        width={80}
        height={80}
        className="rounded-md"
      />
      <div className="flex-1">
        <h4 className="font-semibold">{name}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
        <div className="flex justify-between mt-2">
          <span className="text-sm">Quantidade: {quantity}</span>
          <span className="font-medium">R${(price * quantity).toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};
