export interface OrderProps {
  id: number;
  user_id: number;
  product_models: ProductModel[];
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
  status: string;
  created_at: string;
  updated_at: string;
}

interface ProductModel {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
  quantity: number;
}
