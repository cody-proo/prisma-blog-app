import * as joi from "joi";

export const createCommentValidation = () => {
  return joi.object().keys({
    content: joi.string().min(10).required().messages({
      "string.min": "Content Must Contain At Least 10 Character",
      "any.required": "Content Is Required",
    }),
  });
};
