import Joi from 'joi';

const employeeValidation = Joi.object({
  firstName: Joi.string()
    .required('its required')
    .min(2)
    .max(40)
    .lowercase()
    .message('First name should contain at least 2 charcters and at most 40'),
  lastName: Joi.string()
    .required('its required')
    .min(2)
    .max(40)
    .lowercase()
    .message('Last name should contain at least 2 charcters and at most 40'),
  email: Joi.string()
    .required('its required')
    .min(2)
    .regex(/^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/)
    .lowercase()
    .message('Invalid email format'),
  password: Joi.string()
    .required('its required')
    .min(8)
    .regex(/^(?=.*?[a-zA-Z])(?=.*?[0-9])/)
    .message('Password should be at least 8 characters long and contain letters and numbers'),
  gender: Joi.string().valid('Female', 'Male', 'Other').required(),
  address: Joi.string().required().min(5).max(30).required('its required'),
  dob: Joi.date()
    .greater('1900-1-1')
    .less(new Date())
    .message('Invalid date')
    .required('its required'),
  phone: Joi.string()
    .required('its required')
    .regex(/^[0-9]{10}$/)
    .message('Phone number should be a 10 digits value'),
  active: Joi.boolean().sensitive()
});
export default employeeValidation;
