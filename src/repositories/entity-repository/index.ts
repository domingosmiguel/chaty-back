import { prisma } from '@/config';
import { Prisma } from '@prisma/client';

async function create(data: Prisma.entityUncheckedCreateInput) {
  return prisma.entity.create({
    data,
  });
}

async function findMessagesByEntityId(id: number) {
  return prisma.entity.findMany({
    where: { id },
    include: {
      entity_MessageFrom: true,
      entity_MessageTo: true,
    },
  });
}

const entityRepository = {
  create,
  findMessagesByEntityId,
};

export default entityRepository;
