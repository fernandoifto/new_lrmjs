import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";
import { databasePoolSettings } from "./poolConfig";

if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL environment variable is not set");
}

const { poolConfig, schema } = databasePoolSettings(process.env.DATABASE_URL);
const adapter = new PrismaPg(poolConfig, schema ? { schema } : undefined);

const prismaClient = new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
});

export default prismaClient;
