import * as express from "express";
import { AdminRole, AuthMiddleware } from "../auth";
import { validation } from "../validation";
import {
  createBlog,
  deleteBlog,
  getBlogs,
  getSingleBlog,
  updateBlog,
} from "./blogs.controller";
import { createBlogValidation, updateBlogValidation } from "./blogs.validation";

const blogsRouter = express.Router();

blogsRouter.post(
  "/create",
  AuthMiddleware,
  AdminRole,
  validation(createBlogValidation()),
  createBlog
);

blogsRouter.patch(
  "/:id",
  AuthMiddleware,
  AdminRole,
  validation(updateBlogValidation()),
  updateBlog
);

blogsRouter.get("/:id", AuthMiddleware, getSingleBlog);
blogsRouter.delete("/:id", AuthMiddleware, deleteBlog);
blogsRouter.get("/", AuthMiddleware, getBlogs);

export default blogsRouter;
