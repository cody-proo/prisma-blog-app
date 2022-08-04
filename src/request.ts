import { UserRole } from "@prisma/client";
import { Request } from "express";

export interface ExpressRequestUser {
  id: string
  role: UserRole
}

export interface ExpressRequest<T = {}> extends Request {
  body: T;
  user: {
    id: string;
    role: UserRole;
  };
}
