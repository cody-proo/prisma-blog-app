import * as express from "express";
import { AdminRole, AuthMiddleware } from "../auth";
import { validation } from "../validation";
import { createBlog, getBlogs, getSingleBlog } from "./blogs.controller";
import { createBlogValidation } from "./blogs.validation";

const blogsRouter = express.Router();

blogsRouter.post(
  "/create",
  AuthMiddleware,
  AdminRole,
  validation(createBlogValidation()),
  createBlog
);

blogsRouter.get("/:id", AuthMiddleware, getSingleBlog);
blogsRouter.get("/", AuthMiddleware, getBlogs);

export default blogsRouter;
