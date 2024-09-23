import { ProductModelProps } from "./ProductModel";

export interface OrderProductProps {
  id: number;
  orderId: string;
  price: number;
  quantity: number;

  productModelId: string;
  productModel: ProductModelProps;
}
