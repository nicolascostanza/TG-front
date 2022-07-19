import Joi from 'joi';

export const employeeValidationSignUp = Joi.object({
  firstName: Joi.string()
    .required()
    .min(3)
    .max(40)
    .lowercase()
    .regex(/^([ \u00c0-\u01ffa-zA-Z'-])+$/)
    .messages({
      'string.min': 'First name must contain at least 3 characters',
      'string.max': 'First name must contain 40 characters or less',
      'string.pattern.base': 'First name must contain only letters',
      'string.empty': 'This field is required'
    }),
  lastName: Joi.string()
    .required()
    .min(3)
    .max(40)
    .lowercase()
    .regex(/^([ \u00c0-\u01ffa-zA-Z'-])+$/)
    .messages({
      'string.min': 'Last name must contain at least 3 characters',
      'string.max': 'Last name must contain 40 characters or less',
      'string.pattern.base': 'Last name must contain only letters',
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
    })
});

export const employeeValidationUpdate = Joi.object({
  firstName: Joi.string()
    .min(3)
    .max(40)
    .lowercase()
    .regex(/^([ \u00c0-\u01ffa-zA-Z'-])+$/)
    .messages({
      'string.min': 'First name must contain at least 3 characters',
      'string.max': 'First name must contain 40 characters or less',
      'string.pattern.base': 'First name must contain only letters'
    }),
  lastName: Joi.string()
    .min(3)
    .max(40)
    .lowercase()
    .regex(/^([ \u00c0-\u01ffa-zA-Z'-])+$/)
    .messages({
      'string.min': 'Last name must contain at least 3 characters',
      'string.max': 'Last name must contain 40 characters or less',
      'string.pattern.base': 'Last name must contain only letters'
    }),
  email: Joi.string()
    .min(2)
    .regex(/^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/)
    .lowercase()
    .messages({
      'string.min': 'Email must contain at least 2 characters',
      'string.pattern.base': 'Invalid email format'
    }),
  password: Joi.string()
    .min(8)
    .regex(/(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{8,25})$/)
    .messages({
      'string.min': 'Password must contain at least 8 characters',
      'string.pattern.base': 'Password must contain letters and numbers'
    })
});

export const employeeValidationLogIn = Joi.object({
  email: Joi.string()
    .required('This field is required')
    .min(2)
    .regex(/^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/)
    .lowercase()
    .messages({
      'string.min': 'Email must contain at least 2 characters',
      'string.pattern.base': 'Invalid email format',
      'string.empty': 'This field is required'
    }),
  password: Joi.string()
    .required('This field is required')
    .min(8)
    .regex(/(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{8,25})$/)
    .messages({
      'string.min': 'Password must contain at least 8 characters',
      'string.pattern.base': 'Password must contain letters and numbers',
      'string.empty': 'This field is required'
    })
});
