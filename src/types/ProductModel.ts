import { ProductProps } from "./Product";

export interface ProductModelProps {
  id: number;
  description: string;
  price: number;
  quantity: number;
  image: string;

  created_at: string;
  updated_at: string;

  productId: string;
  product?: ProductProps;
}
