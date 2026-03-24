import { sign, verify } from "jsonwebtoken";
import { JWT_ALGORITHM, JWT_VERIFY_OPTIONS } from "../config/jwtOptions";

const TYP = "upload_access";

/** Caminho relativo à pasta uploads, ex.: receitas/arquivo.jpg */
export function signUploadRelativePath(relativePath: string): string {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error("JWT_SECRET não configurado");
    }
    if (relativePath.includes("..") || relativePath.startsWith("/")) {
        throw new Error("Caminho de upload inválido");
    }
    return sign({ typ: TYP, p: relativePath }, secret, { expiresIn: "1h" });
}

export function verifyUploadAccessToken(token: string, relativePath: string): boolean {
    const secret = process.env.JWT_SECRET;
    if (!secret) return false;
    if (relativePath.includes("..")) return false;
    try {
        const payload = verify(token, secret, JWT_VERIFY_OPTIONS) as { typ?: string; p?: string };
        return payload.typ === TYP && typeof payload.p === "string" && payload.p === relativePath;
    } catch {
        return false;
    }
}
