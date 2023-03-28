import { CreateUserParams } from '@/repositories/user-repository';
import Joi from 'joi';

export const createUserSchema = Joi.object<CreateUserParams>({
  email: Joi.string().email().required(),
  username: Joi.string().min(3).required(),
  password: Joi.string().min(6).required(),
});
