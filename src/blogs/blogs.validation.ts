import * as joi from "joi";

export const createBlogValidation = () => {
  return joi.object().keys({
    title: joi.string().min(3).required().messages({
      "string.min": "Your Title Must At Least Contain 3 Character",
      "any.required": "You Must Fill Your Title",
    }),
    description: joi.string().min(10).required().messages({
      "string.min": "Your Description Must At Least Contain 10 Character",
      "any.required": "You Must Fill Your Description",
    }),
  });
};
