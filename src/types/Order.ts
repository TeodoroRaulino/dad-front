export enum OrderStatus {
  PENDING = "pending",
  FINISHED = "finished",
}

export interface OrderProps {
  id: number;
  user_id: number;
  status: OrderStatus;
  product_models: ProductModelOrderProps[];
  total_price: number;
  created_at: string;
  updated_at: string;
}

export interface CheckoutProps {
  user_id: number;
  product_models: {
    id: number;
    quantity: number;
  }[];
}

export interface CheckoutResponseProps {
  id: number;
  user_id: number;
  status: OrderStatus;
  created_at: string;
  updated_at: string;
}

export interface ProductModelOrderProps {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
  quantity: number;
  url: string;
}
