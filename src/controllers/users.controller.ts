import { AuthenticatedRequest } from '@/middlewares';
import usersService from '@/services/users-service';
import { Request, Response } from 'express';
import httpStatus from 'http-status';

export async function usersPost(req: Request, res: Response) {
  const { email, username, password } = req.body;

  await usersService.createUser({ email, username, password });
  return res.sendStatus(httpStatus.CREATED);
}

export async function searchUsers(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { username } = req.params;
  console.log('controller');
  const users = await usersService.findUsers(userId, username);
  return res.status(httpStatus.OK).send(users);
}
