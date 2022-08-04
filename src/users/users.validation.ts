import { UserRole } from "@prisma/client";
import * as joi from "joi";

export const SignupValidation = () => {
  return joi.object().keys({
    username: joi.string().min(3).required().messages({
      "string.min": "Your Username Must At Least Contains 3 Character",
      "any.required": "Your Username Must Be Fill",
    }),
    email: joi.string().email().required().messages({
      "string.email": "Your Email Address Is Invalid",
      "any.required": "Your Email Must Be Fill",
    }),
    password: joi
      .string()
      .min(8)
      .required()
      .pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/)
      .messages({
        "string.min": "Your Password Must At Least 8 Character",
        "string.pattern.base":
          "Your Password Must Contains At Least 1 Character And 1 Number",
        "any.required": "Your Password Must Be Fill",
      }),
    role: joi
      .string()
      .valid(UserRole.ADMIN, UserRole.USER)
      .required()
      .messages({
        "any.only": "You Must One Of The Main Role ( ADMIN - USER )",
        "any.required": "Your Role Must Be Fill",
      }),
    firstName: joi.string().min(3).optional().messages({
      "string.min": "Your FirstName Must At Least Contain 3 Character",
    }),
    lastName: joi.string().min(3).optional().messages({
      "string.min": "Your LastName Must At Least Contain 3 Character",
    }),
  });
};

export const LoginValidation = () => {
  return joi.object().keys({
    email: joi.string().email().required().messages({
      "string.email": "Your Email Address Is Invalid",
      "any.required": "Your Email Must Be Fill",
    }),
    password: joi
      .string()
      .min(8)
      .required()
      .pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/)
      .messages({
        "string.min": "Your Password Must At Least 8 Character",
        "any.pattern":
          "Your Password Must Contains At Least 1 Character And 1 Number",
        "any.required": "Your Password Must Be Fill",
      }),
  });
};

export const UpdateProfileValidation = () => {
  return joi.object().keys({
    username: joi.string().min(3).optional().messages({
      "string.min": "Your Username Must At Least Contains 3 Character",
    }),
    firstName: joi.string().min(3).optional().messages({
      "string.min": "Your FirstName Must At Least Contain 3 Character",
    }),
    lastName: joi.string().min(3).optional().messages({
      "string.min": "Your LastName Must At Least Contain 3 Character",
    }),
  });
};
