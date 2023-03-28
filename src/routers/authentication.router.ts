import { singInPost } from '@/controllers';
import { validateBody } from '@/middlewares';
import { signInSchema } from '@/schemas';
import { Router } from 'express';

const authenticationRouter = Router();

authenticationRouter.post('/signIn', validateBody(signInSchema), singInPost);

export { authenticationRouter };
