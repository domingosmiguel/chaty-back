import loginRepository from '@/repositories/login-repository';
import userRepository, { CreateUserParams } from '@/repositories/user-repository';
import bcrypt from 'bcrypt';
import { duplicatedEmailError } from './errors';

async function createUser({ email, password, username }: CreateUserParams): Promise<void> {
  await validateUniqueEmailOrFail(email);

  const hashedPassword = await bcrypt.hash(password, 12);

  await userRepository.create({
    email,
    password: hashedPassword,
    username,
  });
}

async function validateUniqueEmailOrFail(email: string) {
  const userWithSameEmail = await loginRepository.findByEmail(email);
  if (userWithSameEmail) {
    throw duplicatedEmailError();
  }
}

async function findUsers(userId: number, username: string) {
  return userRepository.findByUsername(userId, username, {
    username: true,
    pictureUrl: true,
    entityId: true,
  });
}

const userService = {
  createUser,
  findUsers,
};

export * from './errors';
export default userService;
