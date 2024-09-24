import api from "@/services/api";
import { CheckoutProps, CheckoutResponseProps } from "@/types/Order";

const prefix = "/orders";

const path = {
  checkout: `${prefix}`,
};

export const checkout = async (
  data: CheckoutProps
): Promise<CheckoutResponseProps> => {
  try {
    const response = await api.post(path.checkout, {
      order: data,
    });
    console.log(response.data);
    return response.data as CheckoutResponseProps;
  } catch (error) {
    throw error;
  }
};
