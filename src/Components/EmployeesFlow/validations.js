import Joi from 'joi';

export const employeeValidationSignUp = Joi.object({
  firstName: Joi.string()
    .required('its required')
    .min(3)
    .max(40)
    .lowercase()
    .regex(/^([ \u00c0-\u01ffa-zA-Z'-])+$/)
    .messages({
      'string.min': 'First name must contain at least 3 characters',
      'string.max': 'First name must contain 40 characters or less',
      'string.pattern.base': 'First name must contain only numbers',
      'string.empty': 'This field is required'
    }),
  lastName: Joi.string()
    .required('its required')
    .min(3)
    .max(40)
    .lowercase()
    .regex(/^([ \u00c0-\u01ffa-zA-Z'-])+$/)
    .messages({
      'string.min': 'Last name must contain at least 3 characters',
      'string.max': 'Last name must contain 40 characters or less',
      'string.pattern.base': 'Last name must contain only numbers',
      'string.empty': 'This field is required'
    }),
  email: Joi.string()
    .required('its required')
    .min(2)
    .regex(/^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/)
    .lowercase()
    .messages({
      'string.min': 'Email must contain at least 2 characters',
      'string.pattern.base': 'Invalid email format',
      'string.empty': 'This field is required'
    }),
  password: Joi.string()
    .required('its required')
    .min(8)
    .regex(/(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{8,25})$/)
    .messages({
      'string.min': 'Password must contain at least 8 characters',
      'string.pattern.base': 'Password must contain letters and numbers',
      'string.empty': 'This field is required'
    }),
  gender: Joi.string().valid('Female', 'Male', 'Other').required(),
  address: Joi.string()
    .required('its required')
    .min(5)
    .max(30)
    .regex(/^[a-zA-Z0-9\s,'-]*$/)
    .messages({
      'string.min': 'Address must contain at least 5 characters',
      'string.max': 'Address must contain 30 characters or less',
      'string.pattern.base': 'Address must contain letters and numbers',
      'string.empty': 'This field is required'
    }),
  dob: Joi.date().required('its required').greater('1900-1-1').less(new Date()).messages({
    'date.base': 'Date is not valid',
    'date.greater': 'End date must be after the start date',
    'date.empty': 'This field is required'
  }),
  phone: Joi.string()
    .required('its required')
    .regex(/^[0-9\-+]{9,10}$/)
    .messages({
      'string.pattern.base':
        'Phone must contain only numbers, and should contain between 9 and 10 characters',
      'string.empty': 'This field is required'
    }),
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
