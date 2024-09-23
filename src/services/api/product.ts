import api from "@/services/api";
import { ProductCompleteProps, ProductProps } from "@/types/Product";

const prefix = "/products";

const path = {
  getProducts: `${prefix}`,
  getProduct: (id: number) => `${prefix}/${id}`,
  deleteProduct: (id: number) => `${prefix}/${id}`,
};

export const getProducts = async () => {
  try {
    const response = await api.get(path.getProducts);
    return response.data as ProductCompleteProps[];
  } catch (error) {
    throw error;
  }
};

export const getProduct = async (id: number) => {
  try {
    const response = await api.get(path.getProduct(id));
    return response.data as ProductProps;
  } catch (error) {
    throw error;
  }
};

export const deleteProduct = async (id: number) => {
  try {
    await api.delete(path.deleteProduct(id));
  } catch (error) {
    throw error;
  }
};
