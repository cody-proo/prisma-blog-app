import { Response } from "express";
import { ExpressRequest } from "../request";
import { ISignupBody } from "./users.type";
import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";
import * as jsonwebtoken from "jsonwebtoken";

const prismaClient = new PrismaClient();

export const Signup = async (
  request: ExpressRequest<ISignupBody>,
  response: Response
) => {
  const { email, password, role, username, firstName, lastName } = request.body;
  const passwordHash = await bcrypt.hash(password, 8);
  const user = await prismaClient.user.create({
    data: {
      email,
      username,
      role,
      firstName,
      lastName,
      password: passwordHash,
    },
    select: {
      id: true,
      role: true,
    },
  });
  const token = jsonwebtoken.sign({ user }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
  return response.json({ token });
};
