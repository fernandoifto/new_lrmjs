import { databasePoolSettings } from "../src/tools/prisma/poolConfig";

// O pg não exporta ConnectionParameters; o construtor é o mesmo usado pelo Pool.
// eslint-disable-next-line @typescript-eslint/no-require-imports
const ConnectionParameters = require("pg/lib/connection-parameters");

function sslOf(connectionString: string) {
    const { poolConfig } = databasePoolSettings(connectionString);
    return new ConnectionParameters(poolConfig).ssl;
}

describe("databasePoolSettings", () => {
    it("trata sslmode=require como criptografia sem validar o certificado", () => {
        const settings = databasePoolSettings(
            "postgresql://u:p@db.example:5432/giftmed_sys?schema=public&sslmode=require"
        );
        expect(settings.schema).toBe("public");
        expect(settings.poolConfig.connectionString).not.toContain("sslmode=");
        expect(settings.poolConfig.connectionString).not.toContain("schema=");
        expect(sslOf("postgresql://u:p@db.example:5432/giftmed_sys?sslmode=require")).toEqual({
            rejectUnauthorized: false,
        });
    });

    it("mantém a verificação quando o modo é verify-full", () => {
        expect(sslOf("postgresql://u:p@db.example:5432/giftmed_sys?sslmode=verify-full")).toEqual({});
    });

    it("não liga SSL em conexão local sem sslmode", () => {
        const settings = databasePoolSettings(
            "postgresql://u:p@127.0.0.1:5432/giftmed_db?schema=public"
        );
        expect(settings.schema).toBe("public");
        expect(sslOf("postgresql://u:p@127.0.0.1:5432/giftmed_db?schema=public")).toBeFalsy();
    });
});
