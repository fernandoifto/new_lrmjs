import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Criar diretórios de uploads se não existirem
const uploadDirAgendamentos = path.join(__dirname, '../../uploads/agendamentos');
const uploadDirReceitas = path.join(__dirname, '../../uploads/receitas');
if (!fs.existsSync(uploadDirAgendamentos)) {
    fs.mkdirSync(uploadDirAgendamentos, { recursive: true });
}
if (!fs.existsSync(uploadDirReceitas)) {
    fs.mkdirSync(uploadDirReceitas, { recursive: true });
}

// Configuração do storage para agendamentos
const storageAgendamentos = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDirAgendamentos);
    },
    filename: (req, file, cb) => {
        // Nome único: timestamp + número aleatório + extensão original
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, `foto-${uniqueSuffix}${ext}`);
    }
});

// Configuração do storage para receitas médicas
const storageReceitas = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDirReceitas);
    },
    filename: (req, file, cb) => {
        // Nome único: timestamp + número aleatório + extensão original
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, `receita-${uniqueSuffix}${ext}`);
    }
});

// Filtro para aceitar apenas imagens
const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    const allowedMimes = [
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/gif',
        'image/webp'
    ];

    if (allowedMimes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Apenas arquivos de imagem são permitidos (JPEG, PNG, GIF, WEBP)'));
    }
};

// Configuração do multer para agendamentos
export const upload = multer({
    storage: storageAgendamentos,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB por arquivo
    }
});

// Configuração do multer para receitas
export const uploadReceita = multer({
    storage: storageReceitas,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB por arquivo
    }
});

// Middleware para múltiplos arquivos (agendamentos)
export const uploadMultiple = upload.array('fotos', 10); // Máximo 10 fotos

// Middleware para uma única foto (receita médica)
export const uploadSingleReceita = uploadReceita.single('foto_receita');
