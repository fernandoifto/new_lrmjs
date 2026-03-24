import { sign, verify } from "jsonwebtoken";
import { JWT_ALGORITHM, JWT_VERIFY_OPTIONS } from "../config/jwtOptions";

const TYP = "paciente_ctx";

export function issuePacienteContextToken(pacienteId: number): string {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error("JWT_SECRET não configurado");
    }
    return sign({ typ: TYP, pacienteId }, secret, { expiresIn: "8h" });
}

/** Retorna o id do paciente se o token for válido; caso contrário null. */
export function verifyPacienteContextToken(token: string | undefined): number | null {
    if (!token) return null;
    const secret = process.env.JWT_SECRET;
    if (!secret) return null;
    try {
        const payload = verify(token, secret, JWT_VERIFY_OPTIONS) as { typ?: string; pacienteId?: number };
        if (payload.typ !== TYP || typeof payload.pacienteId !== "number") {
            return null;
        }
        return payload.pacienteId;
    } catch {
        return null;
    }
}
