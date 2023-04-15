import { userConversationsGet, userMessagePost, userMessagesGet } from '@/controllers/messages.controller';
import { authenticateToken } from '@/middlewares';
import { Router } from 'express';

const messagesRouter = Router();

messagesRouter
  .all('/*', authenticateToken)
  .get('/', userConversationsGet)
  .post('/:recipientId', userMessagePost)
  .get('/:recipientId', userMessagesGet);

export { messagesRouter };
