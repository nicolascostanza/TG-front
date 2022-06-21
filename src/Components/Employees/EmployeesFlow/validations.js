import Joi from 'joi';

export const employeeValidationSignUp = Joi.object({
  firstName: Joi.string()
    .required('its required')
    .min(3)
    .max(40)
    .lowercase()
    .regex(/^([ \u00c0-\u01ffa-zA-Z'-])+$/)
    .message('Only letters'),
  lastName: Joi.string()
    .required('its required')
    .min(2)
    .max(40)
    .lowercase()
    .regex(/^([ \u00c0-\u01ffa-zA-Z'-])+$/)
    .message('Only letters'),
  email: Joi.string()
    .required('its required')
    .min(2)
    .regex(/^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/)
    .lowercase()
    .message('Invalid email format'),
  password: Joi.string()
    .required('its required')
    .min(8)
    .regex(/(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{8,25})$/)
    .message('Only letters and numbers'),
  gender: Joi.string().valid('Female', 'Male', 'Other').required(),
  address: Joi.string()
    .required()
    .min(5)
    .max(30)
    .regex(/^[a-zA-Z0-9\s,'-]*$/)
    .message('Only letters, numbers and spaces'),
  dob: Joi.date()
    .required('its required')
    .greater('1900-1-1')
    .less(new Date())
    .message('Invalid date'),
  phone: Joi.string()
    .required('its required')
    .regex(/^[0-9\-+]{9,10}$/)
    .message('Phone number should be a 10 digits value'),
  active: Joi.boolean().sensitive()
});

export const employeeValidationUpdate = Joi.object({
  firstName: Joi.string()
    .min(2)
    .max(40)
    .lowercase()
    .regex(/^([ \u00c0-\u01ffa-zA-Z'-])+$/)
    .message('Only letters'),
  lastName: Joi.string()
    .min(2)
    .max(40)
    .lowercase()
    .regex(/^([ \u00c0-\u01ffa-zA-Z'-])+$/)
    .message('Only letters'),
  email: Joi.string()
    .min(2)
    .regex(/^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/)
    .lowercase()
    .message('Invalid email format'),
  password: Joi.string()
    .min(8)
    .regex(/(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{8,25})$/)
    .message('Only letters and numbers'),
  gender: Joi.string().valid('Female', 'Male', 'Other'),
  address: Joi.string()
    .required()
    .min(5)
    .max(30)
    .regex(/^[a-zA-Z0-9\s,'-]*$/)
    .message('Only letters, numbers and spaces'),
  dob: Joi.date().greater('1900-1-1').less(new Date()).message('Invalid date'),
  phone: Joi.string()
    .regex(/^[0-9\-+]{9,10}$/)
    .message('Phone number should be a 10 digits value'),
  active: Joi.boolean().sensitive()
});
