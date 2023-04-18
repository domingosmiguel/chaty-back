import { invalidDataError } from '@/errors';
import { AuthenticatedRequest } from '@/middlewares';
import messageService from '@/services/messages-service';
import { Response } from 'express';
import httpStatus from 'http-status';

export async function userConversationsGet(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  const conversations = await messageService.getConversations(userId);

  return res.status(httpStatus.OK).send(conversations);
}

export async function userMessagePost(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { recipientId } = req.params;
  const { text } = req.body;

  await messageService.postNewMessage({ from: userId, to: parseInt(recipientId, 10), text });

  return res.sendStatus(httpStatus.OK);
}

export async function userMessagesGet(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { recipientId } = req.params;

  if (recipientId === 'undefined' || recipientId === '0') {
    throw invalidDataError(['Missing Entity ID']);
  }

  const chatData = await messageService.getAllMessagesAndUserData({ userId, recipientId: parseInt(recipientId, 10) });

  return res.status(httpStatus.OK).send(chatData);
}
