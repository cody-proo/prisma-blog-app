import { Response } from "express";
import { ExpressRequest } from "../request";
import { ICreateCommentBody } from "./comments.type";
import { BaseController } from "../controller.base";

export class CommentsController extends BaseController {
  createComment = async (
    request: ExpressRequest<ICreateCommentBody>,
    response: Response
  ) => {
    const blogId = request.params.blog;
    const creatorId = request.user.id;
    const blog = this.client.blog.findFirst({ where: { id: blogId } });
    if (!blog) {
      return response.status(404).json({ message: "The Blog Is Not Found" });
    }
    const comment = await this.client.comment.create({
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

  deleteComment = async (request: ExpressRequest, response: Response) => {
    const commentId = request.params.id;
    const creatorId = request.user.id;
    const comment = await this.client.comment.findFirst({
      where: {
        creatorId,
        id: commentId,
      },
    });
    if (!comment) {
      return response.status(404).json({ message: "Not Found" });
    }
    await this.client.comment.delete({ where: { id: comment.id } });
    return response.status(200).json({ message: "delete successfully" });
  };

  getAllComments = async (request: ExpressRequest, response: Response) => {
    const creatorId = request.user.id;
    const blogId = request.params.blog;
    const comments = await this.client.comment.findMany({
      where: { creatorId, blogId },
      include: {
        creator: true,
        blog: true,
      },
    });
    return response.status(200).json({ comments });
  };
}
