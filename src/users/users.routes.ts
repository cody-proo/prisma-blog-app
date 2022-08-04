import * as express from "express";
import { AuthMiddleware } from "../auth";
import { validation } from "../validation";
import {
  getUserProfile,
  Login,
  Signup,
  UpdateProfile,
} from "./users.controller";
import {
  LoginValidation,
  SignupValidation,
  UpdateProfileValidation,
} from "./users.validation";

const userRouter = express.Router();

userRouter.post("/signup", validation(SignupValidation()), Signup);

userRouter.post("/login", validation(LoginValidation()), Login);

userRouter.patch(
  "/profile",
  AuthMiddleware,
  validation(UpdateProfileValidation()),
  UpdateProfile
);

userRouter.get("/profile", AuthMiddleware, getUserProfile);

export default userRouter;
