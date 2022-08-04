import { PrismaClient } from "@prisma/client";
import { Response } from "express";
import { ExpressRequest } from "../request";
import { ICreateBlogBody, IUpdateBlogBody } from "./blogs.type";

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
    include: {
      creator: {},
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

export const deleteBlog = async (
  request: ExpressRequest,
  response: Response
) => {
  const blogId = request.params.id;
  const blog = await prismaClient.blog.findFirst({
    where: { id: blogId, creatorId: request.user.id },
  });
  if (!blog) {
    return response.status(404).json({ message: "Not Found" });
  }
  const deletedDocument = await prismaClient.blog.delete({
    where: { id: blogId },
  });
  if (!deletedDocument) {
    return response.status(404).json({ message: "Not Found" });
  }
  return response.status(200).json({ message: "delete successfully" });
};

export const updateBlog = async (
  request: ExpressRequest<IUpdateBlogBody>,
  response: Response
) => {
  const blogId = request.params.id;
  const updatedDocument = await prismaClient.blog.update({
    where: { id: blogId },
    data: request.body,
    include: {
      creator: {},
    },
  });
  if (!updatedDocument) {
    return response.status(404).json({ message: "Not Found" });
  }
  return response.status(200).json({ blog: updatedDocument });
};
