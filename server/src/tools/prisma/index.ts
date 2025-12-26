import { PrismaClient } from "../generated/prisma";

const prismaClient = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

export default prismaClient;