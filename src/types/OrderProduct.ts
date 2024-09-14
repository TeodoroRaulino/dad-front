import { ProductModelProps } from "./ProductModel";

export interface OrderProductProps {
  id: string;
  orderId: string;
  price: number;
  quantity: number;

  productModelId: string;
  productModel: ProductModelProps;
}
