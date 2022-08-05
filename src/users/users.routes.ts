import * as express from "express";
import { AuthMiddleware } from "../auth";
import { validation } from "../validation";
import { UsersController } from "./users.controller";
import {
  LoginValidation,
  SignupValidation,
  UpdateProfileValidation,
} from "./users.validation";

const userRouter = express.Router();
const controller = new UsersController();

userRouter.post(
  "/signup",
  validation(SignupValidation()),
  controller.signupUser
);

userRouter.post("/login", validation(LoginValidation()), controller.loginUser);

userRouter.patch(
  "/profile",
  AuthMiddleware,
  validation(UpdateProfileValidation()),
  controller.updateProfile
);

userRouter.get("/profile", AuthMiddleware, controller.getUserProfile);

export default userRouter;
