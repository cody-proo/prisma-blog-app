import * as express from "express";
import { AdminRole, AuthMiddleware } from "../auth";
import { validation } from "../validation";
import { BlogsController } from "./blogs.controller";
import { createBlogValidation, updateBlogValidation } from "./blogs.validation";

const blogsRouter = express.Router();

const controller = new BlogsController();

blogsRouter.post(
  "/create",
  AuthMiddleware,
  AdminRole,
  validation(createBlogValidation()),
  controller.createBlog
);

blogsRouter.patch(
  "/:id",
  AuthMiddleware,
  AdminRole,
  validation(updateBlogValidation()),
  controller.updateBlog
);

blogsRouter.get("/:id", AuthMiddleware, controller.getSingleBlog);
blogsRouter.delete("/:id", AuthMiddleware, controller.deleteBlog);
blogsRouter.get("/", AuthMiddleware, controller.getBlogs);

export default blogsRouter;
