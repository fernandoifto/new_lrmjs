# LRM App - Sistema de Agendamento de Remédios

Sistema completo de agendamento de remédios desenvolvido com Next.js e Express.

## 🚀 Tecnologias

### Frontend
- **Next.js** 15.5.9
- **React** 19.2.3
- **TypeScript** 5.9.3
- **Bootstrap** 5.3.8
- **Axios** 1.13.2

### Backend
- **Express** 4.22.1
- **Prisma** 7.2.0
- **TypeScript** 5.9.3
- **PostgreSQL**

## 📋 Pré-requisitos

- Node.js 18+ 
- PostgreSQL
- npm ou yarn

## 🔧 Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/fernandoifto/new_lrmjs.git
cd new_lrmjs
```

### 2. Instale as dependências do backend

```bash
cd server
npm install
```

### 3. Configure o banco de dados e variáveis de ambiente

Crie um arquivo `.env` na pasta `server` com:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco?schema=public"
JWT_SECRET="seu_secret_jwt_super_seguro_aqui"
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=seu_email@gmail.com
SMTP_PASS=sua_senha_de_app
SMTP_FROM=seu_email@gmail.com
FRONTEND_URL=http://localhost:3000
```

**Nota:** Para mais detalhes sobre a configuração de e-mail, consulte [ENV_VARIABLES.md](./server/ENV_VARIABLES.md)

### 4. Execute as migrações do Prisma

```bash
cd server
npm run prisma:migrate
```

### 5. Instale as dependências do frontend

```bash
cd ../views
npm install
```

## 🏃 Executando o projeto

### Backend

```bash
cd server
npm run dev
```

O servidor estará rodando em `http://localhost:3333`

### Frontend

```bash
cd views
npm run dev
```

A aplicação estará disponível em `http://localhost:3000`

## 📁 Estrutura do Projeto

```
lrm_appjs/
├── server/          # Backend (Express + Prisma)
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── middlewares/
│   │   └── routes.ts
│   └── prisma/
├── views/           # Frontend (Next.js)
│   ├── src/
│   │   ├── app/
│   │   ├── api/
│   │   └── lib/
│   └── public/
└── db/              # Scripts e diagramas do banco
```

## 🔐 Segurança

- Todas as dependências estão atualizadas para versões estáveis
- Vulnerabilidades corrigidas (Next.js, React)
- Autenticação com JWT
- Validação de dados no backend
- Recuperação de senha via e-mail com token seguro (expira em 1 hora)
- Páginas protegidas por autenticação (dashboard, cadastro de usuários)

## 📚 Documentação

- [Análise de Versões Estáveis](./VERSOES_ESTAVEIS.md)

## 👤 Autor

Fernando de Souza Arantes

## 📝 Licença

ISC

---

**Repositório:** [https://github.com/fernandoifto/new_lrmjs](https://github.com/fernandoifto/new_lrmjs)

