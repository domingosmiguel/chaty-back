import messageRepository from '@/repositories/message-repository';
import userRepository from '@/repositories/user-repository';
import { Prisma } from '@prisma/client';

export async function postNewMessage(data: Prisma.messageUncheckedCreateInput) {
  const messages = await messageRepository.createMessage(data);

  return messages;
}

export async function getAllMessagesAndUserData({ userId, recipientId }: { userId: number; recipientId: number }) {
  const user = await userRepository.findById(userId, { entityId: true, pictureUrl: true, username: true });

  const messages = await messageRepository.findChatMessages(
    { entityId: user.entityId, recipientId },
    { id: true, text: true, from: true },
  );

  return {
    entityId: user.entityId,
    entityImg: user.pictureUrl,
    entityUsername: user.username,
    messages: messages,
  };
}

export async function getConversations(userId: number) {
  const { entityId } = await userRepository.findById(userId, { entityId: true });

  const messages = await messageRepository.findByEntityId(entityId);

  return messages;
}

const messageService = {
  getAllMessagesAndUserData,
  getConversations,
  postNewMessage,
};

export default messageService;
