import type { VerifyOptions } from "jsonwebtoken";

/** Algoritmo único do projeto (HMAC + JWT_SECRET). Evita aceitar tokens com outro `alg` na verificação. */
export const JWT_ALGORITHM = "HS256" as const;

export const JWT_VERIFY_OPTIONS: VerifyOptions = {
    algorithms: [JWT_ALGORITHM],
};
