import { Response } from "express";
import { ExpressRequest } from "../request";
import { ILoginBody, ISignupBody, IUpdateProfileBody } from "./users.type";
import * as bcrypt from "bcrypt";
import * as jsonwebtoken from "jsonwebtoken";
import { BaseController } from "../controller.base";

export class UsersController extends BaseController {
  signupUser = async (
    request: ExpressRequest<ISignupBody>,
    response: Response
  ) => {
    const { email, password, role, username, firstName, lastName } =
      request.body;
    const existBeforeUser = await this.client.user.findFirst({
      where: {
        email,
      },
      select: { id: true },
    });
    if (existBeforeUser) {
      return response.status(400).json({ message: "Email Already Taken" });
    }
    const passwordHash = await bcrypt.hash(password, 8);
    const user = await this.client.user.create({
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
    return response.status(201).json({ token });
  };

  loginUser = async (
    request: ExpressRequest<ILoginBody>,
    response: Response
  ) => {
    const { email, password } = request.body;
    const user = await this.client.user.findFirst({
      where: {
        email,
      },
      select: {
        password: true,
        id: true,
        role: true,
      },
    });
    if (!user) {
      return response.status(404).json({ message: "Invalid User" });
    }
    const hasValidPassword = await bcrypt.compare(password, user.password);
    if (!hasValidPassword) {
      return response.status(404).json({ message: "Invalid User" });
    }
    delete user.password;
    const token = jsonwebtoken.sign({ user }, process.env.SECRET_KEY, {
      expiresIn: "24h",
    });
    return response.status(200).json({ token });
  };

  updateProfile = async (
    request: ExpressRequest<IUpdateProfileBody>,
    response: Response
  ) => {
    const user = await this.client.user.findFirst({
      where: { id: request.user.id },
      select: {
        id: true,
      },
    });
    if (!user) {
      return response.status(400).json({ message: "UnAuthorization" });
    }
    const updateUser = await this.client.user.update({
      where: { id: user.id },
      data: request.body,
      select: { id: true, role: true },
    });
    const token = await jsonwebtoken.sign(
      { user: updateUser },
      process.env.SECRET_KEY,
      { expiresIn: "24h" }
    );
    return response.status(200).json({ token });
  };

  getUserProfile = async (request: ExpressRequest, response: Response) => {
    const user = await this.client.user.findFirst({
      where: {
        id: request.user.id,
      },
      include: {
        blogs: true,
        comments: true,
      },
    });
    delete user.password;
    return response.status(200).json({ user });
  };
}
