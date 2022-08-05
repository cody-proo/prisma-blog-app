import * as express from "express";
import { AdminRole, AuthMiddleware } from "../auth";
import { validation } from "../validation";
import { CommentsController } from "./comments.controller";
import { createCommentValidation } from "./comments.validation";

const commonRouter = express.Router();
const controller = new CommentsController();

commonRouter.get(
  "/:blog",
  AuthMiddleware,
  AdminRole,
  controller.getAllComments
);

commonRouter.post(
  "/:blog",
  AuthMiddleware,
  validation(createCommentValidation()),
  controller.createComment
);

commonRouter.delete("/:id", AuthMiddleware, controller.deleteComment);

export default commonRouter;
