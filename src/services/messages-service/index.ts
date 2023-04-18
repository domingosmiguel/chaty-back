import messageRepository from '@/repositories/message-repository';
import userRepository from '@/repositories/user-repository';
import { Prisma } from '@prisma/client';

export async function postNewMessage(data: Prisma.messageUncheckedCreateInput) {
  const messages = await messageRepository.createMessage(data);

  return messages;
}

export async function getAllMessagesAndUserData({ userId, recipientId }: { userId: number; recipientId: number }) {
  const user = await userRepository.findById(userId, { entityId: true });
  const recipientUser = await userRepository.findByEntityId(recipientId, {
    entityId: true,
    pictureUrl: true,
    username: true,
  });

  const messages = await messageRepository.findChatMessages(
    { entityId: user.entityId, recipientId },
    { id: true, text: true, from: true },
  );

  return {
    entityId: recipientUser.entityId,
    entityImg: recipientUser.pictureUrl,
    entityUsername: recipientUser.username,
    messages: messages,
  };
}

type HashTable = {
  [key: number]: boolean;
};

type LastMessages = {
  entityId: number;
  entityImg: string;
  entityUsername: string;
  message: Message;
};

export type Message = {
  id: number;
  text: string;
  from: number;
  createdAt: Date;
};

export async function getConversations(userId: number) {
  const { entityId } = await userRepository.findById(userId, { entityId: true });

  const allMessages = await messageRepository.findByEntityId(entityId, {
    id: true,
    from: true,
    to: true,
    text: true,
    createdAt: true,
  });

  const lastMessages: LastMessages[] = [];

  const hashTable: HashTable = {};

  for (const message of allMessages) {
    if (message.from !== entityId) {
      if (!hashTable[message.from]) {
        hashTable[message.from] = true;

        await pushMessageWithFriendData(lastMessages, message.from, message);
      }
    } else {
      if (!hashTable[message.to]) {
        hashTable[message.to] = true;

        await pushMessageWithFriendData(lastMessages, message.to, message);
      }
    }
  }

  return lastMessages;
}

const pushMessageWithFriendData = async (
  array: LastMessages[],
  friendEntityId: number,
  message: Message & { to: number },
) => {
  const friendData = await userRepository.findByEntityId(friendEntityId, {
    entityId: true,
    pictureUrl: true,
    username: true,
  });

  array.push({
    entityId: friendData.entityId,
    entityImg: friendData.pictureUrl,
    entityUsername: friendData.username,
    message: {
      id: message.id,
      text: message.text,
      from: message.from,
      createdAt: message.createdAt,
    },
  });
};

const messageService = {
  getAllMessagesAndUserData,
  getConversations,
  postNewMessage,
};

export default messageService;
