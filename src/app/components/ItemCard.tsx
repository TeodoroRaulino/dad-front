import { ProductProps } from "@/types/Product";
import { Badge } from "@/ui/badge";
import { Card, CardContent } from "@/ui/card";
import Image from "next/image";
import Link from "next/link";

export const ItemCard: React.FC<ProductProps> = (product) => {
  return (
    <Card key={product.id} className="bg-zinc-900 border-none">
      <Link href={`/product/${product.id}`}>
        <CardContent className="p-0 relative">
          <Image
            src={"/smartwatch.jpg"}
            alt={product.name}
            width={300}
            height={200}
            className="w-full h-auto rounded-md"
          />
          <Badge className="absolute bottom-4 left-4 bg-zinc-800 text-white">
            {product.name}{" "}
            <span className="ml-2 text-blue-400">R${product.price} BRL</span>
          </Badge>
        </CardContent>
      </Link>
    </Card>
  );
};
