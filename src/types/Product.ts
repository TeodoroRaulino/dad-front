import { ProductModelProps } from "./ProductModel";

export interface ProductCompleteProps {
  product: ProductProps;
  product_models: ProductModelProps[];
}

export interface ProductProps {
  id: number;
  name: string;
  category: string;

  product_model_id: number;
  description: string;
  price: number;
  quantity: number;
  url: string;

  created_at: string;
  updated_at: string;
}

export interface ProductCreateProps {
  name: string;
  category: string;
  product_models: ModelForCreate[];
}

export interface ModelForCreate {
  price: number;
  description: string;
  quantity: number;
  image_key: string;
}

export interface ProductCategoriesProps {
  categories: string[];
}
