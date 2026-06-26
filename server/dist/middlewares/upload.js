"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadSingleReceita = exports.uploadMultiple = exports.uploadReceita = exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
// Criar diretórios de uploads se não existirem
const uploadDirAgendamentos = path_1.default.join(__dirname, '../../uploads/agendamentos');
const uploadDirReceitas = path_1.default.join(__dirname, '../../uploads/receitas');
if (!fs_1.default.existsSync(uploadDirAgendamentos)) {
    fs_1.default.mkdirSync(uploadDirAgendamentos, { recursive: true });
}
if (!fs_1.default.existsSync(uploadDirReceitas)) {
    fs_1.default.mkdirSync(uploadDirReceitas, { recursive: true });
}
// Configuração do storage para agendamentos
const storageAgendamentos = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDirAgendamentos);
    },
    filename: (req, file, cb) => {
        // Nome único: timestamp + número aleatório + extensão original
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path_1.default.extname(file.originalname);
        cb(null, `foto-${uniqueSuffix}${ext}`);
    }
});
// Configuração do storage para receitas médicas
const storageReceitas = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDirReceitas);
    },
    filename: (req, file, cb) => {
        // Nome único: timestamp + número aleatório + extensão original
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path_1.default.extname(file.originalname);
        cb(null, `receita-${uniqueSuffix}${ext}`);
    }
});
// Filtro para aceitar apenas imagens
const fileFilter = (req, file, cb) => {
    const allowedMimes = [
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/gif',
        'image/webp'
    ];
    if (allowedMimes.includes(file.mimetype)) {
        cb(null, true);
    }
    else {
        cb(new Error('Apenas arquivos de imagem são permitidos (JPEG, PNG, GIF, WEBP)'));
    }
};
// Configuração do multer para agendamentos
exports.upload = (0, multer_1.default)({
    storage: storageAgendamentos,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB por arquivo
    }
});
// Configuração do multer para receitas
exports.uploadReceita = (0, multer_1.default)({
    storage: storageReceitas,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB por arquivo
    }
});
// Middleware para múltiplos arquivos (agendamentos)
exports.uploadMultiple = exports.upload.array('fotos', 10); // Máximo 10 fotos
// Middleware para uma única foto (receita médica)
exports.uploadSingleReceita = exports.uploadReceita.single('foto_receita');
