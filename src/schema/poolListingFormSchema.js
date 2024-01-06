import Joi from "joi";

export const poolListingFormSchema = Joi.object({
  address: Joi.string().required().min(5).max(50).messages({
    "string.min": "Address should contain minimum of 5 character",
    "string.max": "Address should contain maximum of 50 characters",
    "string.empty": "Address is required",
  }),
  access_instructions: Joi.any(),
  poolName: Joi.string().required().min(5).max(50).messages({
    "string.min": "Pool Name should contain minimum of 5 character",
    "string.max": "Pool Name should contain maximum of 50 characters",
    "string.empty": "Pool Name is required",
  }),
  poolDescription: Joi.string().required().max(500).messages({
    "string.max": "Pool Description should contain maximum of 500 characters",
    "string.empty": "Pool Description is required",
  }),
  amenity1: Joi.any(),
  amenity2: Joi.any(),
  amenity3: Joi.any(),
  amenity4: Joi.any(),
  amenity5: Joi.any(),
  amenity6: Joi.any(),
  amenity7: Joi.any(),
  amenity8: Joi.any(),
  amenity9: Joi.any(),
  amenity10: Joi.any(),
  amenity12: Joi.any(),
  amenity13: Joi.any(),
  amenity14: Joi.any(),
  amenity15: Joi.any(),
  amenity16: Joi.any(),
  amenity17: Joi.any(),
  amenity18: Joi.any(),
  amenity19: Joi.any(),
  amenity20: Joi.any(),
  amenity21: Joi.any(),
  amenity22: Joi.any(),
  amenity23: Joi.any(),
  amenity24: Joi.any(),
  amenity25: Joi.any(),
  amenity26: Joi.any(),
  amenity27: Joi.any(),
  amenity28: Joi.any(),
  amenity29: Joi.any(),
  amenity30: Joi.any(),
  amenity31: Joi.any(),
  amenity32: Joi.any(),
  amenity33: Joi.any(),
  amenity34: Joi.any(),
  amenity35: Joi.any(),
  amenity36: Joi.any(),
  amenity37: Joi.any(),
  amenity38: Joi.any(),
  amenity39: Joi.any(),
  restroom: Joi.any(),
  restRoomDescription: Joi.any(),
  additionalAmenities: Joi.any(),
  poolLength: Joi.number().required().min(1).max(9999).messages({
    "number.min": "Pool Length must be greater than or equal to 1",
    "number.max": "Pool Length must be less than or equal to 9999",
    "number.base": "Pool Length is required",
  }),
  poolWidth: Joi.number().required().min(1).max(9999).messages({
    "number.min": "Pool Width must be greater than or equal to 1",
    "number.max": "Pool Width must be less than or equal to 9999",
    "number.base": "Pool Width is required",
  }),
  shallowestPoint: Joi.number().required().min(1).max(9999).messages({
    "number.min": "Pool Shallowest Point must be greater than or equal to 1",
    "number.max": "Pool Shallowest Point must be less than or equal to 9999",
    "number.base": "Pool Shallowest Point is required",
  }),
  deepestPoint: Joi.number().required().min(1).max(9999).messages({
    "number.min": "Pool Deepest Point must be greater than or equal to 1",
    "number.max": "Pool Deepest Point must be less than or equal to 9999",
    "number.base": "Pool Deepest Point is required",
  }),
  poolPrice: Joi.number().required().min(1).max(999999).messages({
    "number.min": "Price must be greater than or equal to 1",
    "number.max": "Price must be less than or equal to 999999",
    "number.base": "Price is required",
  }),
  extraGuestsPrice: Joi.number().required().min(1).max(999999).messages({
    "number.min": "Extra Guests Price must be greater than or equal to 1",
    "number.max": "Extra Guests Price must be less than or equal to 999999",
    "number.base": "Extra Guests Price is required",
  }),
  maxGuests: Joi.number().required().min(1).max(9999).messages({
    "number.min": "Maximum Guests Capacity must be greater than or equal to 1",
    "number.max": "Maximum Guests Capacity must be less than or equal to 9999",
    "number.base": "Maximum Guests Capacity is required",
  }),
  forGuestsAfter: Joi.number()
    .required()
    .min(1)
    .max(Joi.ref("maxGuests"))
    .messages({
      "number.min": "Additonal Guests Limit must be greater than or equal to 1",
      "number.max":
        "Additonal Guests Limit must be less than or equal to Pools Maximum Guests Capacity",
      "number.base": "Additonal Guests Limit is required",
      "any.ref":
        "Additonal Guests Limit must be less than or equal to Pools Maximum Guests Capacity",
    }),
});
