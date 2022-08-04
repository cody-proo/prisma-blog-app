import { UserRole } from "@prisma/client";

export interface ISignupBody {
  email: string;
  password: string;
  role: UserRole;
  username: string;
  firstName?: string;
  lastName?: string;
}

export interface ILoginBody {
  email: string;
  password: string;
}
