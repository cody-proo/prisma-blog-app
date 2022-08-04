import { PrismaClient } from "@prisma/client";
import { Response } from "express";
import { ExpressRequest } from "../request";
import { ICreateBlogBody } from "./blogs.type";

const prismaClient = new PrismaClient();

export const createBlog = async (
  request: ExpressRequest<ICreateBlogBody>,
  response: Response
) => {
  const { title, description } = request.body;
  const titleTakenBefore = await prismaClient.blog.findFirst({
    where: { title },
    select: {
      id: true,
    },
  });
  if (titleTakenBefore) {
    return response.status(400).json({ message: "BadRequestException" });
  }
  const blog = await prismaClient.blog.create({
    data: {
      title,
      description,
      creatorId: request.user.id,
    },
  });
  return response.status(201).json(blog);
};

export const getBlogs = async (request: ExpressRequest, response: Response) => {
  const blogs = await prismaClient.blog.findMany({ include: { creator: {} } });
  return response.json({ blogs });
};

export const getSingleBlog = async (
  request: ExpressRequest,
  response: Response
) => {
  const blogId: string = request.params.id;
  const blog = await prismaClient.blog.findUnique({
    where: { id: blogId },
    include: { creator: {} },
  });
  if (!blog) {
    return response.status(404).json({ message: "Not Found" });
  }
  return response.json({ blog });
};
