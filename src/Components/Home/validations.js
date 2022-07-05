import Joi from 'joi';

export const validationsForms = Joi.object({
  firstName: Joi.string()
    .min(3)
    .max(40)
    .lowercase()
    .regex(/^([ \u00c0-\u01ffa-zA-Z'-])+$/)
    .messages({
      'string.min': 'First name must contain at least 3 characters',
      'string.max': 'First name must contain 40 characters or less',
      'string.pattern.base': 'First name must contain only letters'
    })
});
