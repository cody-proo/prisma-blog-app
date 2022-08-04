import { NextFunction, Request, Response } from "express";
import * as Joi from "joi";

export const validation = (schema: Joi.ObjectSchema<any>) => {
  return (request: Request, response: Response, next: NextFunction) => {
    const error = schema.validate(request.body, {
      abortEarly: false,
      allowUnknown: false,
    })?.error;
    if (error) {
      return response.status(400).json({
        message: "BadRequestException",
        errors: error.details.map((e) => e.message),
      });
    }
    next();
  };
};
