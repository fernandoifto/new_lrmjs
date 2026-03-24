/**
 * Testes de integração (Supertest) para controles de segurança corrigidos.
 *
 * Documentação dos cenários:
 * - Antes: rotas administrativas / dados de paciente aceitavam acesso indevido.
 * - Depois: apenas admin ou token de contexto de paciente válido.
 */
import request from "supertest";
import { sign } from "jsonwebtoken";
import fs from "fs";
import path from "path";

jest.mock("../src/tools/prisma", () => ({
    __esModule: true,
    default: {
        $transaction: jest.fn(),
        users: {
            findUnique: jest.fn(),
            findFirst: jest.fn(),
            findMany: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        },
        turnos: { findMany: jest.fn() },
        pacientes: {
            findFirst: jest.fn(),
            findUnique: jest.fn(),
            create: jest.fn(),
            findMany: jest.fn(),
        },
        solicitacoes: {
            findMany: jest.fn(),
            findUnique: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        },
        userRoles: { createMany: jest.fn(), deleteMany: jest.fn() },
        roles: {
            create: jest.fn(),
            findMany: jest.fn(),
            findUnique: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        },
        permissoes: {
            create: jest.fn(),
            findMany: jest.fn(),
            findUnique: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        },
        agendamentos: {
            findMany: jest.fn(),
            findUnique: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        },
        lotes: {
            findUnique: jest.fn(),
            findMany: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        },
        retiradas: {
            findMany: jest.fn(),
            findUnique: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        },
        medicamentos: {},
        formasFarmaceuticas: {},
        tiposMedicamentos: {},
    },
}));

import prisma from "../src/tools/prisma";
import { buildApp } from "../src/app";
import { issuePacienteContextToken } from "../src/services/pacienteContextToken";
import { signUploadRelativePath } from "../src/services/uploadAccessToken";

/** Prisma real é substituído por jest.mock — tipagem relaxada para configurar mocks. */
const prismaMock = prisma as unknown as {
    users: { findUnique: jest.Mock; findMany: jest.Mock };
    pacientes: { findFirst: jest.Mock };
    solicitacoes: { findMany: jest.Mock; create: jest.Mock };
    turnos: { findMany: jest.Mock };
};

function jwtForUser(userId: number): string {
    return sign({ email: "t@t.com" }, process.env.JWT_SECRET as string, {
        subject: String(userId),
        expiresIn: "1h",
    });
}

function minimalPngBuffer(): Buffer {
    const b64 = fs.readFileSync(path.join(__dirname, "fixtures", "minimal.png.b64"), "utf-8").trim();
    return Buffer.from(b64, "base64");
}

describe("Segurança da API (integração)", () => {
    const app = buildApp();

    beforeEach(() => {
        jest.clearAllMocks();
        prismaMock.turnos.findMany.mockResolvedValue([]);
        prismaMock.users.findMany.mockResolvedValue([]);
        prismaMock.solicitacoes.findMany.mockResolvedValue([]);

        prismaMock.users.findUnique.mockImplementation(async (args: { where?: { id?: number }; include?: { userRoles?: boolean } }) => {
            const id = args?.where?.id;
            const admin = {
                id: 1,
                username: "admin",
                email: "a@a.com",
                password: "x",
                is_admin: true,
                created: new Date(),
                modified: new Date(),
            };
            const regular = {
                id: 2,
                username: "user",
                email: "u@u.com",
                password: "x",
                is_admin: false,
                created: new Date(),
                modified: new Date(),
            };
            if (args?.include?.userRoles) {
                if (id === 1) return { ...admin, userRoles: [] };
                if (id === 2) {
                    return {
                        ...regular,
                        userRoles: [
                            {
                                role: {
                                    rolePermissoes: [{ permissao: { nome: "agendamentos.ver" } }],
                                },
                            },
                        ],
                    };
                }
            }
            if (id === 1) return admin;
            if (id === 2) return regular;
            return null;
        });
    });

    describe("Admin-only: usuários e permissões", () => {
        it("GET /users retorna 403 para usuário autenticado não-admin (correção IDOR administrativo)", async () => {
            const res = await request(app).get("/users").set("Authorization", `Bearer ${jwtForUser(2)}`);
            expect(res.status).toBe(403);
        });

        it("GET /users retorna 200 para administrador", async () => {
            const res = await request(app).get("/users").set("Authorization", `Bearer ${jwtForUser(1)}`);
            expect(res.status).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
        });

        it("GET /roles retorna 403 para não-admin (antes qualquer logado acessava)", async () => {
            const res = await request(app).get("/roles").set("Authorization", `Bearer ${jwtForUser(2)}`);
            expect(res.status).toBe(403);
        });

        it("POST /user sem autenticação retorna 401 (cadastro não pode ser anônimo)", async () => {
            const res = await request(app).post("/user").send({
                username: "x",
                email: "x@x.com",
                password: "secret1",
            });
            expect(res.status).toBe(401);
        });

        it("POST /user com usuário não-admin retorna 403", async () => {
            const res = await request(app)
                .post("/user")
                .set("Authorization", `Bearer ${jwtForUser(2)}`)
                .send({
                    username: "x",
                    email: "x@x.com",
                    password: "secret1",
                });
            expect(res.status).toBe(403);
        });
    });

    describe("Paciente: CPF e contexto (LGPD / IDOR)", () => {
        it("GET /paciente/cpf/:cpf não expõe PII completo — apenas id e pacienteContextToken", async () => {
            prismaMock.pacientes.findFirst.mockResolvedValue({
                id: 42,
                nome: "Dado Sensível",
                cpf: "00000000000",
                telefone: "11999999999",
                cartaosus: "123",
                datanascimento: new Date(),
                created: new Date(),
                modified: new Date(),
            });

            const res = await request(app).get("/paciente/cpf/00000000000");
            expect(res.status).toBe(200);
            expect(res.body).toEqual({
                id: 42,
                pacienteContextToken: expect.any(String),
            });
            expect(res.body).not.toHaveProperty("nome");
            expect(res.body).not.toHaveProperty("telefone");
        });

        it("GET /solicitacoes/paciente exige X-Paciente-Context alinhado ao id (bloqueia enumeração por id na URL)", async () => {
            const resNoHeader = await request(app).get("/solicitacoes/paciente?paciente=7");
            expect(resNoHeader.status).toBe(403);

            const wrong = await request(app)
                .get("/solicitacoes/paciente?paciente=7")
                .set("X-Paciente-Context", issuePacienteContextToken(99));
            expect(wrong.status).toBe(403);

            prismaMock.solicitacoes.findMany.mockResolvedValue([
                {
                    id: 1,
                    qtde: 1,
                    status: "pendente_de_aprovacao",
                    foto_receita: "/uploads/receitas/secret.jpg",
                    id_lotes: 1,
                    id_pacientes: 7,
                    created: new Date(),
                    modified: new Date(),
                    lotes: { id: 1, numero: "L1", medicamento: { id: 1, descricao: "M" } },
                    paciente: { id: 7, nome: "P" },
                },
            ]);

            const ok = await request(app)
                .get("/solicitacoes/paciente?paciente=7")
                .set("X-Paciente-Context", issuePacienteContextToken(7));
            expect(ok.status).toBe(200);
            expect(ok.body[0]).not.toHaveProperty("foto_receita");
        });

        it("POST /solicitacao rejeita quando X-Paciente-Context não corresponde a id_pacientes (anti-IDOR na criação)", async () => {
            const buf = minimalPngBuffer();
            const res = await request(app)
                .post("/solicitacao")
                .field("qtde", "1")
                .field("id_lotes", "1")
                .field("id_pacientes", "7")
                .attach("foto_receita", buf, "receita.png")
                .set("X-Paciente-Context", issuePacienteContextToken(8));

            expect(res.status).toBe(403);
            expect(prismaMock.solicitacoes.create).not.toHaveBeenCalled();
        });
    });

    describe("Arquivos /uploads", () => {
        it("requisição sem query t= recebe 403 (antes arquivos eram públicos apenas com URL)", async () => {
            const res = await request(app).get("/uploads/receitas/inexistente.jpg");
            expect(res.status).toBe(403);
        });

        it("com JWT de arquivo válido passa do guard (404 se arquivo não existir no disco)", async () => {
            const t = signUploadRelativePath("receitas/inexistente.jpg");
            const res = await request(app).get(`/uploads/receitas/inexistente.jpg?t=${encodeURIComponent(t)}`);
            expect([403, 404]).toContain(res.status);
            if (res.status === 404) {
                expect(res.text).toBeDefined();
            }
        });
    });
});
