import { ProductProps } from "@/types/Product";
import { Badge } from "@/ui/badge";
import { Card, CardContent } from "@/ui/card";
import Image from "next/image";
import Link from "next/link";

export const ItemCard: React.FC<ProductProps> = (product) => {
  return (
    <Card key={product.id} className="border-none">
      <Link href={`/product/${product.id}`}>
        <CardContent className="p-0 relative">
          <Image
            src={product.url || "/placeholder.png"}
            alt={product.name}
            width={300}
            height={300}
            className="w-full h-48 object-contain rounded-sm"
          />
          <Badge className="absolute bottom-4 left-4 text-white">
            {product.name}{" "}
            <span className="ml-2 text-blue-400">R${product.price} BRL</span>
          </Badge>
        </CardContent>
      </Link>
    </Card>
  );
};
