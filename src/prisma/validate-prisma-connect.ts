import { PrismaClientInitializationError } from "@prisma/client/runtime/library";

export async function validatePrismaConnction(error: any) {
    if (error instanceof PrismaClientInitializationError) {
        return 'Prisma client initialization error.'
      }
}