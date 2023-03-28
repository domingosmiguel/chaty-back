import loginRepository from '@/repositories/login-repository';
import sessionRepository from '@/repositories/session-repository';
import userRepository from '@/repositories/user-repository';
import { login, user } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { invalidCredentialsError } from './errors';

async function signIn(params: SignInParams): Promise<SignInResult> {
  const { email, password } = params;

  const login = await getLoginOrFail(email);

  await validatePasswordOrFail(password, login.password);

  const token = await createSession(login.userId);

  const user = await getUserOrFail(login.userId);

  return {
    user,
    token,
  };
}

async function getLoginOrFail(email: string): Promise<GetLoginOrFailResult> {
  const login = await loginRepository.findByEmail(email, { email: true, password: true, userId: true });
  if (!login) throw invalidCredentialsError();

  return login;
}

async function createSession(userId: number) {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET);
  await sessionRepository.create({
    token,
    userId,
  });

  return token;
}

async function getUserOrFail(id: number): Promise<GetUserOrFailResult> {
  return await userRepository.findById(id, { id: true, username: true, pictureUrl: true, recipientId: true });
}

async function validatePasswordOrFail(password: string, userPassword: string) {
  const isPasswordValid = await bcrypt.compare(password, userPassword);
  if (!isPasswordValid) throw invalidCredentialsError();
}

export type SignInParams = Pick<login, 'email' | 'password'>;

type SignInResult = {
  user: GetUserOrFailResult;
  token: string;
};

type GetLoginOrFailResult = Pick<login, 'password' | 'userId'>;

type GetUserOrFailResult = Pick<user, 'id' | 'username' | 'pictureUrl' | 'recipientId'>;

const authenticationService = {
  signIn,
};

export default authenticationService;
