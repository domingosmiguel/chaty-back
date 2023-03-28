import { prisma } from '@/config';
import { login, Prisma, user } from '@prisma/client';
import loginRepository from '../login-repository';
import recipientRepository from '../recipient-repository';

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

async function create(data: CreateUserParams) {
  return prisma.$transaction(async () => {
    const recipient = await recipientRepository.create({});

    const user = await newUser({
      username: data.username,
      recipientId: recipient.id,
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
};

export default userRepository;

export type CreateUserParams = Pick<login, 'email' | 'password'> & Pick<user, 'username'>;
