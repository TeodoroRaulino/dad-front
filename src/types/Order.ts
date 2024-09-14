import { OrderProductProps } from "./OrderProduct";
import { UserProps } from "./User";

export interface OrderProps {
  id: string;
  createdAt: number;
  items: OrderProductProps[];
  total: number;

  userId: string;
  user: UserProps;
}
