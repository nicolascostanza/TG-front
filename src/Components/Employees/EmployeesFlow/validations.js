import Joi from 'joi';

const employeeValidation = Joi.object({
  firstName: Joi.string()
    .min(2)
    .max(40)
    .uppercase(0)
    .lowercase()
    .message('First name should contain at least 2 charcters and at most 40'),
  surName: Joi.string()
    .min(2)
    .max(40)
    .uppercase()
    .message('Last name should contain at least 2 charcters and at most 40'),
  email: Joi.string()
    .min(2)
    .regex(/^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/)
    .lowercase()
    .message('Invalid email format'),
  password: Joi.string()
    .min(8)
    .regex(/^(?=.*?[a-zA-Z])(?=.*?[0-9])/)
    .message('Password should be at least 8 characters long and contain letters and numbers'),
  gender: Joi.string().lowercase().valid('female', 'male', 'other'),
  address: Joi.string().required().min(5).max(30),
  dob: Joi.date().greater('1900-1-1').less(new Date()).message('Invalid date'),
  phone: Joi.string()
    .regex(/^[0-9]{10}$/)
    .message('Phone number should be a 10 digits value'),
  active: Joi.boolean().sensitive()
});
export default employeeValidation;
