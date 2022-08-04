import { UserRole } from "@prisma/client";
import { NextFunction, Response } from "express";
import * as jsonwebtoken from "jsonwebtoken";
import { ExpressRequest, ExpressRequestUser } from "./request";

export const AuthMiddleware = (
  request: ExpressRequest,
  response: Response,
  next: NextFunction
) => {
  const authorization = request.header("authorization");
  if (!authorization) {
    return response.status(400).json({ message: "UnAuthorization" });
  }
  const token = authorization?.split("Bearer ")[1];
  if (!token) {
    return response.status(400).json({ message: "UnAuthorization" });
  }
  const decodedToken = jsonwebtoken.decode(token) as jsonwebtoken.JwtPayload & {
    user: ExpressRequestUser;
  };
  if (!decodedToken || decodedToken.exp * 1000 < Date.now()) {
    return response.status(400).json({ message: "UnAuthorization" });
  }
  request.user = { id: decodedToken.user.id, role: decodedToken.user.role };
  next();
};

export const AdminRole = (
  request: ExpressRequest,
  response: Response,
  next: NextFunction
) => {
  const role = request?.user?.role;
  console.log(role);
  if (!role || role !== UserRole.ADMIN) {
    return response.status(403).json({ message: "Forbidden Access" });
  }
  next();
};
