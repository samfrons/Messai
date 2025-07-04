import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Temporary fix for DATABASE_URL issue
const databaseUrl = process.env.DATABASE_URL || 'file:./prisma/dev.db'

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  datasources: {
    db: {
      url: databaseUrl
    }
  },
  log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma