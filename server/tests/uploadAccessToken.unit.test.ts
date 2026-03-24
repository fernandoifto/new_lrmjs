import { signUploadRelativePath, verifyUploadAccessToken } from "../src/services/uploadAccessToken";

describe("uploadAccessToken (unitário)", () => {
    it("token válido só para o caminho relativo assinado (impede reuso em outro arquivo)", () => {
        const rel = "receitas/doc-1.jpg";
        const token = signUploadRelativePath(rel);
        expect(verifyUploadAccessToken(token, rel)).toBe(true);
        expect(verifyUploadAccessToken(token, "receitas/outro.jpg")).toBe(false);
    });

    it("rejeita path traversal no segredo de assinatura", () => {
        expect(() => signUploadRelativePath("../etc/passwd")).toThrow();
    });

    it("rejeita token inválido", () => {
        expect(verifyUploadAccessToken("bad", "receitas/x.jpg")).toBe(false);
    });
});
