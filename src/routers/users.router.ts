import { usersPost } from '@/controllers';
import { validateBody } from '@/middlewares';
import { createUserSchema } from '@/schemas';
import { Router } from 'express';

const usersRouter = Router();

usersRouter.post('/', validateBody(createUserSchema), usersPost);

export { usersRouter };
