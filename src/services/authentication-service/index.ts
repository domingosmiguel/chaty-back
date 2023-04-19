import loginRepository from '@/repositories/login-repository';
import sessionRepository from '@/repositories/session-repository';
import userRepository from '@/repositories/user-repository';
import { login, user } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { invalidCredentialsError } from './errors';

async function signIn(params: SignInParams): Promise<SignInResult> {
  const { email, password } = params;
  console.log({email, password});
  const login = await getLoginOrFail(email);
  console.log({login});
  await validatePasswordOrFail(password, login.password);
  console.log('valid');
  const token = await createSession(login.userId);
  console.log({token});
  const user = await getUserOrFail(login.userId);
  console.log({user});
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
  return await userRepository.findById(id, { id: true, username: true, pictureUrl: true, entityId: true });
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

type GetUserOrFailResult = Pick<user, 'id' | 'username' | 'pictureUrl' | 'entityId'>;

const authenticationService = {
  signIn,
};

export default authenticationService;
