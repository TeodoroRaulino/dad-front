import { ProductProps } from "./Product";

export interface ProductModelProps {
  id: string;
  description: string;
  price: number;
  stock: number;
  image: string;

  productId: string;
  product?: ProductProps;
}
