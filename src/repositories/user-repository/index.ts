import { prisma } from '@/config';
import { login, Prisma, user } from '@prisma/client';
import entityRepository from '../entity-repository';
import loginRepository from '../login-repository';

async function findById(id: number, select?: Prisma.userSelect) {
  const params: Prisma.userFindUniqueArgs = {
    where: {
      id,
    },
  };

  if (select) {
    params.select = select;
  }

  return prisma.user.findUnique(params);
}

async function findByUsername(userId: number, username: string, select?: Prisma.userSelect) {
  const params: Prisma.userFindManyArgs = {
    where: {
      username: { contains: username },
      // NOT: {
      //   id: userId,
      // },
    },
    take: 10,
  };

  if (select) {
    params.select = select;
  }

  return prisma.user.findMany(params);
}

async function create(data: CreateUserParams) {
  return prisma.$transaction(async () => {
    const entity = await entityRepository.create({});

    const user = await newUser({
      username: data.username,
      entityId: entity.id,
    });

    await loginRepository.create({
      email: data.email,
      password: data.password,
      userId: user.id,
    });
  });
}

async function newUser(data: Prisma.userUncheckedCreateInput) {
  return prisma.user.create({
    data,
  });
}

const userRepository = {
  findById,
  create,
  findByUsername,
};

export default userRepository;

export type CreateUserParams = Pick<login, 'email' | 'password'> & Pick<user, 'username'>;
