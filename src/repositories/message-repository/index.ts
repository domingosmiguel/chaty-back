import { prisma } from '@/config';
import { Prisma } from '@prisma/client';

async function createMessage(data: Prisma.messageUncheckedCreateInput) {
  return prisma.message.create({ data });
}

async function findChatMessages(data: FindAllMessagesArgs, select?: Prisma.messageSelect) {
  const params: Prisma.messageFindManyArgs = {
    where: {
      OR: [
        { from: data.entityId, to: data.recipientId },
        { from: data.recipientId, to: data.entityId },
      ],
    },
  };

  if (select) {
    params.select = select;
  }

  return prisma.message.findMany(params);
}

async function findByEntityId(entityId: number) {
  return prisma.message.groupBy({
    by: ['from', 'to', 'createdAt'],
    where: {
      OR: [
        {
          from: entityId,
        },
        {
          to: entityId,
        },
      ],
      NOT: [
        {
          deletedForAll: true,
        },
      ],
    },
    take: 1,
    orderBy: {
      createdAt: 'desc',
    },
  });
}

const messageRepository = {
  findByEntityId,
  createMessage,
  findChatMessages,
};

export type FindAllMessagesArgs = { entityId: number; recipientId: number };

export default messageRepository;
