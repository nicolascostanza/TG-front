import Joi from 'joi';

export const schema = Joi.object({
  firstName: Joi.string()
    .min(3)
    .regex(/^([ \u00c0-\u01ffa-zA-Z'-])+$/)
    .messages({
      'string.min': 'First name must contain at least 3 characters',
      'string.pattern.base': 'First name must contain only letters',
      'string.empty': 'This field is required'
    }),
  lastName: Joi.string()
    .min(3)
    .regex(/^([ \u00c0-\u01ffa-zA-Z'-])+$/)
    .messages({
      'string.min': 'Last name must contain at least 3 characters',
      'string.pattern.base': 'Last name must contain only letters',
      'string.empty': 'This field is required'
    }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .min(7)
    .messages({
      'string.min': 'Email must contain at least 7 characters',
      'string.email': 'Invalid email format',
      'string.empty': 'This field is required'
    }),
  password: Joi.string()
    .min(8)
    .regex(/(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{8,25})$/)
    .messages({
      'string.min': 'Password must contain at least 8 characters',
      'string.pattern.base': 'Password must contain letters and numbers',
      'string.empty': 'This field is required'
    }),
  active: Joi.boolean()
});
