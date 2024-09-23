import { Role } from "@/constants/enums/roles";

export interface UserProps {
  id: number;
  email: string;
  role: Role;
  jit: string;
}
