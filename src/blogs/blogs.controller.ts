import { Response } from "express";
import { BaseController } from "../controller.base";
import { ExpressRequest } from "../request";
import { ICreateBlogBody, IUpdateBlogBody } from "./blogs.type";

export class BlogsController extends BaseController {
  createBlog = async (
    request: ExpressRequest<ICreateBlogBody>,
    response: Response
  ) => {
    const { title, description } = request.body;
    const titleTakenBefore = await this.client.blog.findFirst({
      where: { title },
      select: {
        id: true,
      },
    });
    if (titleTakenBefore) {
      return response.status(400).json({ message: "BadRequestException" });
    }
    const blog = await this.client.blog.create({
      data: {
        title,
        description,
        creatorId: request.user.id,
      },
      include: {
        creator: {},
      },
    });
    return response.status(201).json(blog);
  };

  getBlogs = async (request: ExpressRequest, response: Response) => {
    const blogs = await this.client.blog.findMany({
      include: { creator: true, comments: true },
    });
    return response.json({ blogs });
  };

  getSingleBlog = async (request: ExpressRequest, response: Response) => {
    const blogId: string = request.params.id;
    const blog = await this.client.blog.findUnique({
      where: { id: blogId },
      include: { creator: true, comments: true },
    });
    if (!blog) {
      return response.status(404).json({ message: "Not Found" });
    }
    return response.json({ blog });
  };

  deleteBlog = async (request: ExpressRequest, response: Response) => {
    const blogId = request.params.id;
    const blog = await this.client.blog.findFirst({
      where: { id: blogId, creatorId: request.user.id },
    });
    if (!blog) {
      return response.status(404).json({ message: "Not Found" });
    }
    const deletedDocument = await this.client.blog.delete({
      where: { id: blogId },
    });
    if (!deletedDocument) {
      return response.status(404).json({ message: "Not Found" });
    }
    return response.status(200).json({ message: "delete successfully" });
  };

  updateBlog = async (
    request: ExpressRequest<IUpdateBlogBody>,
    response: Response
  ) => {
    const blogId = request.params.id;
    const updatedDocument = await this.client.blog.update({
      where: { id: blogId },
      data: request.body,
      include: {
        creator: true,
      },
    });
    if (!updatedDocument) {
      return response.status(404).json({ message: "Not Found" });
    }
    return response.status(200).json({ blog: updatedDocument });
  };
}
