import Joi from "joi";

export const signInSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .min(5)
    .max(50)
    .messages({
      "string.min": "Email should contain minimun of 5 character",
      "string.max": "Email should contain maximum of 50 characters",
      "string.empty": "Email is required",
      "string.email": "Please enter a valid email",
    }),
  password: Joi.string().required().max(50).messages({
    "string.max": "Pasword should contain maximum of 50 characters",
    "string.empty": "Pasword is required",
  }),
  remember_me: Joi.boolean(),
});
