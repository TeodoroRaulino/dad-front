import { ProductModelProps } from "./ProductModel";

export interface ProductProps {
  id: string;
  name: string;
  category: string;
  models: ProductModelProps[];
}
