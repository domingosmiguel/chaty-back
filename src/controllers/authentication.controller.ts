import authenticationService, { SignInParams } from '@/services/authentication-service';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
export async function singInPost(req: Request, res: Response) {
  const { email, password } = req.body as SignInParams;
  console.log('🚀 ~ file: authentication.controller.ts:6 ~ singInPost ~ { email, password }:', { email, password });

  const result = await authenticationService.signIn({ email, password });

  return res.status(httpStatus.OK).send(result);
}
