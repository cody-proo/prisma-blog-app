import * as express from "express";
import { validation } from "../validation";
import { Signup } from "./users.controller";
import { SignupValidation } from "./users.validation";

const userRouter = express.Router();

userRouter.post("/signup", validation(SignupValidation()), Signup);

export default userRouter;
