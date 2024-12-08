import { roles } from "@prisma/client";

export interface Tuser {
  email: string;
  password: string;
  photo: string;
  name: string;
  role: roles;
}
