import * as express from "express";
import { AdminRole, AuthMiddleware } from "../auth";
import { validation } from "../validation";
import {
  createComment,
  deleteComment,
  getAllComments,
} from "./comments.controller";
import { createCommentValidation } from "./comments.validation";

const commonRouter = express.Router();

commonRouter.get("/:blog", AuthMiddleware, AdminRole, getAllComments);

commonRouter.post(
  "/:blog",
  AuthMiddleware,
  validation(createCommentValidation()),
  createComment
);

commonRouter.delete("/:id", AuthMiddleware, deleteComment);

export default commonRouter;
