import { prisma } from '@/config';
import { Prisma } from '@prisma/client';

async function create(data: Prisma.recipientUncheckedCreateInput) {
  return prisma.recipient.create({
    data,
  });
}

const recipientRepository = {
  create,
};

export default recipientRepository;
