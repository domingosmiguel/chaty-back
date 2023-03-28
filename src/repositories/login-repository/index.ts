import { prisma } from '@/config';
import { Prisma } from '@prisma/client';

async function findByEmail(email: string, select?: Prisma.loginSelect) {
  const params: Prisma.loginFindUniqueArgs = {
    where: {
      email,
    },
  };

  if (select) {
    params.select = select;
  }

  return prisma.login.findUnique(params);
}

async function create(data: Prisma.loginUncheckedCreateInput) {
  await prisma.login.create({
    data,
  });
}

const loginRepository = {
  findByEmail,
  create,
};

export default loginRepository;
