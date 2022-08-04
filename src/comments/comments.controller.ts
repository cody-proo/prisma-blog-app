import { Response } from "express";
import { ExpressRequest } from "../request";
import { ICreateCommentBody } from "./comments.type";
import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

export const createComment = async (
  request: ExpressRequest<ICreateCommentBody>,
  response: Response
) => {
  const blogId = request.params.blog;
  const creatorId = request.user.id;
  const blog = prismaClient.blog.findFirst({ where: { id: blogId } });
  if (!blog) {
    return response.status(404).json({ message: "The Blog Is Not Found" });
  }
  const comment = await prismaClient.comment.create({
    data: {
      content: request.body.content,
      blogId,
      creatorId,
    },
    include: {
      blog: true,
      creator: true,
    },
  });
  return response.status(201).json({ comment });
};

export const deleteComment = async (
  request: ExpressRequest,
  response: Response
) => {
  const commentId = request.params.id;
  const creatorId = request.user.id;
  const comment = await prismaClient.comment.findFirst({
    where: {
      creatorId,
      id: commentId,
    },
  });
  if (!comment) {
    return response.status(404).json({ message: "Not Found" });
  }
  await prismaClient.comment.delete({ where: { id: comment.id } });
  return response.status(200).json({ message: "delete successfully" });
};

export const getAllComments = async (
  request: ExpressRequest,
  response: Response
) => {
  const creatorId = request.user.id;
  const blogId = request.params.blog;
  const comments = await prismaClient.comment.findMany({
    where: { creatorId, blogId },
    include: {
      creator: true,
      blog: true,
    },
  });
  return response.status(200).json({ comments });
};
