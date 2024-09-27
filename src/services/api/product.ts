import api from "@/services/api";
import {
  ProductCompleteProps,
  ProductCreateProps,
  ProductProps,
} from "@/types/Product";

const prefix = "/products";

const path = {
  getProducts: `${prefix}`,
  getProduct: (id: number) => `${prefix}/${id}`,
  awsUploadLink: (filename: string) => `/aws-upload-link?filename=${filename}`,
  createProduct: `${prefix}`,
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

export const getAwsUploadLink = async (filename: string) => {
  try {
    const response = await api.get(path.awsUploadLink(filename));
    return response.data as { url: string; key: string };
  } catch (error) {
    throw error;
  }
};

export const createProduct = async (data: ProductCreateProps) => {
  try {
    const response = await api.post(path.getProducts, {
      product: data,
    });
    return response.data as ProductProps;
  } catch (error) {
    throw error;
  }
};
