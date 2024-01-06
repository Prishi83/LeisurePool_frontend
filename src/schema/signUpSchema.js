import Joi from "joi";

export const signUpSchema = Joi.object({
  firstName: Joi.string()
    .regex(/^[a-zA-Z]*$/)
    .required()
    .min(2)
    .max(50)
    .messages({
      "string.min": "First Name should contain minimun of 2 character",
      "string.max": "First Name should contain maximum of 50 characters",
      "string.empty": "First Name is required",
      "string.pattern.base": "Only english letters allowed",
    }),
  lastName: Joi.string()
    .regex(/^[a-zA-Z]*$/)
    .required()
    .min(2)
    .max(50)
    .messages({
      "string.min": "Last Name should contain minimun of 2 character",
      "string.max": "Last Name should contain maximum of 50 characters",
      "string.empty": "Last Name is required",
      "string.pattern.base": "Only english letters allowed",
    }),
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
  password: Joi.string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    )
    .min(8)
    .required()
    .max(50)
    .messages({
      "string.min": "Pasword should contain minimun of 8 character",
      "string.max": "Pasword should contain maximum of 50 characters",
      "string.empty": "Pasword is required",
      "string.pattern.base":
        "Password must contain minimum 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character",
    }),
  confirmPassword: Joi.string().required().messages({
    "string.empty": "Confirm Pasword is required",
    "any.required": "Confirm Pasword is required",
  }),
  agree_terms: Joi.boolean().invalid(false).messages({
    "any.invalid": "Please agree to continue",
  }),
});
