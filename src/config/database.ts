import { PrismaClient } from '@prisma/client';

export let prisma: PrismaClient;
export function connectPrismaDb(): void {
  prisma = new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  });
  console.log('Connected to Postgres.');
}

export async function disconnectPrismaDB(): Promise<void> {
  await prisma?.$disconnect();
}
