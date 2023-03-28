import userService from '@/services/users-service';
import { Request, Response } from 'express';
import httpStatus from 'http-status';

export async function usersPost(req: Request, res: Response) {
  const { email, username, password } = req.body;
  console.log('🚀 ~ file: users.controller.ts:7 ~ usersPost ~ { email, username, password }:', {
    email,
    username,
    password,
  });

  await userService.createUser({ email, username, password });
  return res.sendStatus(httpStatus.CREATED);
}
