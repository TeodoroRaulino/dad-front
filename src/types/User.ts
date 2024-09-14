export interface UserProps {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
}

export enum Role {
  admin,
  user,
}
