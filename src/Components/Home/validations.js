import Joi from 'joi';

// como valido el email con mensaje
// ver si active es required
export const validationsFormProjectCreate = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .regex(/^([ \u00c0-\u01ffa-zA-Z'-])+$/)
    .required('This field is required')
    .messages({
      'string.min': 'Name must contain at least 3 characters',
      'string.max': 'Name must contain 40 characters or less',
      'string.pattern.base': 'Name must contain only letters'
    }),
  description: Joi.string().required('This field is required').min(3).max(200).messages({
    'string.empty': 'This field is required',
    'string.min': 'Description must contain at least 3 characters',
    'string.max': 'Description must contain 200 characters or less'
  }),
  clientName: Joi.string().min(3).max(30).required('This field is required').messages({
    'string.min': 'Client name must contain 3 or more characters',
    'string.max': 'Client name must contain 30 or less characters',
    'string.empty': 'This field is required'
  }),
  startDate: Joi.date().min('01-01-2000').required('This field is required').messages({
    'date.min': 'Start date must be after 01-01-2000',
    'date.base': 'Date is not valid',
    'date.empty': 'This field is required'
  })
});
export const validationsFormProjectEdit = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .regex(/^([ \u00c0-\u01ffa-zA-Z'-])+$/)
    .messages({
      'string.min': 'Name must contain at least 3 characters',
      'string.max': 'Name must contain 40 characters or less',
      'string.pattern.base': 'Name must contain only letters'
    }),
  description: Joi.string().min(3).max(200).messages({
    'string.empty': 'This field is required',
    'string.min': 'Description must contain at least 3 characters',
    'string.max': 'Description must contain 200 characters or less'
  }),
  clientName: Joi.string().min(3).max(30).messages({
    'string.min': 'Client name must contain 3 or more characters',
    'string.max': 'Client name must contain 30 or less characters',
    'string.empty': 'This field is required'
  }),
  startDate: Joi.date().min('01-01-2000').messages({
    'date.min': 'Start date must be after 01-01-2000',
    'date.base': 'Date is not valid',
    'date.empty': 'This field is required'
  })
});
export const validationsFormSuperadminCreate = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .min(7)
    .required('This field is required')
    .messages({
      'string.min': 'Email must contain at least 7 characters',
      'string.email': 'Invalid email format',
      'string.empty': 'This field is required'
    }),
  password: Joi.string()
    .min(8)
    .required('This field is required')
    .regex(/(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{8,25})$/)
    .messages({
      'string.min': 'Password must contain at least 8 characters',
      'string.pattern.base': 'Password must contain letters and numbers',
      'string.empty': 'This field is required'
    }),
  active: Joi.boolean().required()
});
export const validationsFormSuperadminEdit = Joi.object({
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
  active: Joi.boolean().required()
});

export const validationsFormAddEmployee = Joi.object({
  employeeId: Joi.string().required(),
  role: Joi.string(),
  rate: Joi.number().required()
  // isPm: Joi.boolean().required()
});

export const validationsFormAddTask = Joi.object({
  taskName: Joi.string(),
  taskDescription: Joi.string(),
  // assignedEmployee: Joi.array().items(Joi.string().alphanum().length(24)),
  assignedEmployee: Joi.string().alphanum().length(24),
  status: Joi.string(),
  startDate: Joi.date()
});

export const validationsAssignPm = Joi.object({
  employeeId: Joi.string().required(),
  rate: Joi.number().required()
});
