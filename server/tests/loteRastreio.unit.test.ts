import { parsePositiveInt, tryParsePositiveInt } from "../src/utils/parseId";
import {
    buildCodigoRastreioLote,
    buildCodigoRastreioUnidade,
    formatValidadeAammdd,
    parseCodigoRastreio,
    sanitizeNumeroLoteParaCodigo,
} from "../src/utils/loteRastreio";

describe("parsePositiveInt", () => {
    it("aceita inteiros positivos estritos", () => {
        expect(parsePositiveInt("12")).toBe(12);
        expect(parsePositiveInt(7)).toBe(7);
    });

    it("rejeita strings parciais e inválidas", () => {
        expect(() => parsePositiveInt("12abc")).toThrow("inválido");
        expect(() => parsePositiveInt("-1")).toThrow("inválido");
        expect(() => parsePositiveInt("0")).toThrow("inválido");
        expect(() => parsePositiveInt("")).toThrow("inválido");
        expect(tryParsePositiveInt("x")).toBeUndefined();
    });
});

describe("loteRastreio", () => {
    const sampleDate = new Date("2026-12-31T12:00:00.000Z");

    it("sanitiza número do lote", () => {
        expect(sanitizeNumeroLoteParaCodigo(" ab-12 ")).toBe("AB12");
        expect(sanitizeNumeroLoteParaCodigo("!!!")).toBe("SEMNUM");
    });

    it("monta e parseia código base + unidade", () => {
        const base = buildCodigoRastreioLote({
            id: 42,
            numero: "ABC-99",
            datavencimento: sampleDate,
        });
        const validade = formatValidadeAammdd(sampleDate);
        expect(base).toBe(`L42-ABC99-${validade}`);

        const comUnidade = buildCodigoRastreioUnidade(
            { id: 42, numero: "ABC-99", datavencimento: sampleDate },
            3
        );
        const parsed = parseCodigoRastreio(comUnidade);
        expect(parsed).toMatchObject({
            idLote: 42,
            numero: "ABC99",
            validadeAammdd: validade,
            unidade: 3,
        });
    });

    it("rejeita código malformado", () => {
        expect(parseCodigoRastreio("XYZ")).toBeNull();
        expect(parseCodigoRastreio("L0-A-260101")).toBeNull();
    });
});
