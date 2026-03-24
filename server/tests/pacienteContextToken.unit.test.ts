import { issuePacienteContextToken, verifyPacienteContextToken } from "../src/services/pacienteContextToken";

describe("pacienteContextToken (unitário)", () => {
    it("emite e valida token para o mesmo pacienteId", () => {
        const token = issuePacienteContextToken(123);
        expect(verifyPacienteContextToken(token)).toBe(123);
    });

    it("rejeita token de outro paciente (garante binding id↔token)", () => {
        const token = issuePacienteContextToken(1);
        expect(verifyPacienteContextToken(token)).not.toBe(2);
    });

    it("rejeita string vazia ou lixo", () => {
        expect(verifyPacienteContextToken("")).toBeNull();
        expect(verifyPacienteContextToken(undefined)).toBeNull();
        expect(verifyPacienteContextToken("not-a-jwt")).toBeNull();
    });
});
