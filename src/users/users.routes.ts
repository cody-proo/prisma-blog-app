import * as express from "express";
import { validation } from "../validation";
import { Login, Signup } from "./users.controller";
import { LoginValidation, SignupValidation } from "./users.validation";

const userRouter = express.Router();

userRouter.post("/signup", validation(SignupValidation()), Signup);

userRouter.post("/login", validation(LoginValidation()), Login);

export default userRouter;
