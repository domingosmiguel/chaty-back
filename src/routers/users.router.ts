import { searchUsers, usersPost } from '@/controllers';
import { authenticateToken, validateBody } from '@/middlewares';
import { createUserSchema } from '@/schemas';
import { Router } from 'express';

const usersRouter = Router();

usersRouter
  .post('/', validateBody(createUserSchema), usersPost)
  .all('/*', authenticateToken)
  .get('/:username', searchUsers);

export { usersRouter };
