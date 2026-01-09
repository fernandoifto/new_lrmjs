import prismaClient from "../tools/prisma";
import bcrypt from "bcryptjs";
import { sign, verify } from "jsonwebtoken";
import { EmailService } from "../services/emailService";

interface IUser {
    username: string;
    email: string;
    password: string;
    role?: string;
}

interface IAuthUser {
    email: string;
    password: string;
}

class AuthUserModel {
    async execute({ email, password }: IAuthUser) {
        // Validação de campos obrigatórios
        if (!email || !password) {
            throw new Error("Email and password are required");
        }

        const user = await prismaClient.users.findFirst({
            where: {
                email: email
            }
        });

        if (!user) {
            throw new Error("User/password incorrect");
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            throw new Error("User/password incorrect");
        }

        const token = sign({ 
            email: user.email, 
            role: user.role 
        }, process.env.JWT_SECRET as string, {
            subject: user.id.toString(),
            expiresIn: "1d"
        });

        return { 
            id: user.id,
            username: user.username,    
            email: user.email,
            role: user.role,
            token: token
        };
    }
}

class CreateUserModel {
    async execute({ username, email, password, role }: IUser) {
        if(!email){
            throw new Error("Email is required");
        }
        
        if(!username){
            throw new Error("Username is required");
        }
        
        if(!password || password.length < 6){
            throw new Error("Password must be at least 6 characters");
        }

        const userAlreadyExists = await prismaClient.users.findFirst({
            where: {
                email: email
            }
        });

        if(userAlreadyExists){
            throw new Error("User already exists");
        }

        // Hash da senha antes de salvar
        const passwordHash = await bcrypt.hash(password, 10);

        const user = await prismaClient.users.create({
            data: {
                username: username,
                email: email,
                password: passwordHash,
                role: role || null
            },
            select: {
                id: true,
                username: true,
                email: true,
                role: true
            }
        });

        return user;
    }
}

interface IForgotPassword {
    email: string;
}

interface IResetPassword {
    token: string;
    password: string;
}

export class ForgotPasswordModel {
    async execute({ email }: IForgotPassword) {
        if (!email) {
            throw new Error("Email is required");
        }

        const user = await prismaClient.users.findFirst({
            where: {
                email: email
            }
        });

        // Por segurança, não informamos se o e-mail existe ou não
        if (!user) {
            // Retornamos sucesso mesmo se o usuário não existir para não expor informações
            return { message: "If the email exists, a password reset link has been sent." };
        }

        // Gerar token de recuperação com expiração de 1 hora
        const resetToken = sign(
            { 
                email: user.email,
                type: "password_reset"
            },
            process.env.JWT_SECRET as string,
            {
                subject: user.id.toString(),
                expiresIn: "1h"
            }
        );

        // Enviar e-mail com o link de recuperação
        const emailService = new EmailService();
        await emailService.sendPasswordResetEmail(user.email, resetToken);

        return { message: "If the email exists, a password reset link has been sent." };
    }
}

export class ResetPasswordModel {
    async execute({ token, password }: IResetPassword) {
        if (!token || !password) {
            throw new Error("Token and password are required");
        }

        if (password.length < 6) {
            throw new Error("Password must be at least 6 characters");
        }

        let decoded: any;
        try {
            decoded = verify(token, process.env.JWT_SECRET as string);
            
            // Verificar se o token é do tipo password_reset
            if (decoded.type !== "password_reset") {
                throw new Error("Invalid token type");
            }
        } catch (error) {
            throw new Error("Invalid or expired token");
        }

        const userId = parseInt(decoded.sub);
        
        const user = await prismaClient.users.findUnique({
            where: {
                id: userId
            }
        });

        if (!user) {
            throw new Error("User not found");
        }

        // Hash da nova senha
        const passwordHash = await bcrypt.hash(password, 10);

        // Atualizar senha do usuário
        await prismaClient.users.update({
            where: {
                id: userId
            },
            data: {
                password: passwordHash
            }
        });

        return { message: "Password has been reset successfully" };
    }
}

interface IUpdateUser {
    username?: string;
    email?: string;
    password?: string;
    role?: string;
}

//Modelo de listar usuários
class ListUsersModel {
    async execute() {
        const users = await prismaClient.users.findMany({
            select: {
                id: true,
                username: true,
                email: true,
                role: true,
                created: true,
                modified: true
            },
            orderBy: {
                created: 'desc'
            }
        });
        return users;
    }
}

//Modelo de visualizar usuário
class GetUserModel {
    async execute(id: number) {
        const user = await prismaClient.users.findUnique({
            where: {
                id: id
            },
            select: {
                id: true,
                username: true,
                email: true,
                role: true,
                created: true,
                modified: true
            }
        });
        
        if (!user) {
            throw new Error("Usuário não encontrado");
        }
        
        return user;
    }
}

//Modelo de editar usuário
class UpdateUserModel {
    async execute(id: number, data: IUpdateUser) {
        const userExists = await prismaClient.users.findUnique({
            where: { id: id }
        });
        
        if (!userExists) {
            throw new Error("Usuário não encontrado");
        }
        
        const updateData: any = {};
        
        if (data.username) {
            updateData.username = data.username;
        }
        
        if (data.email) {
            // Verificar se o email já existe em outro usuário
            const emailExists = await prismaClient.users.findFirst({
                where: {
                    email: data.email,
                    id: { not: id }
                }
            });
            
            if (emailExists) {
                throw new Error("Email já está em uso por outro usuário");
            }
            
            updateData.email = data.email;
        }
        
        if (data.password) {
            if (data.password.length < 6) {
                throw new Error("A senha deve ter no mínimo 6 caracteres");
            }
            updateData.password = await bcrypt.hash(data.password, 10);
        }
        
        if (data.role !== undefined) {
            updateData.role = data.role;
        }
        
        const user = await prismaClient.users.update({
            where: {
                id: id
            },
            data: updateData,
            select: {
                id: true,
                username: true,
                email: true,
                role: true,
                created: true,
                modified: true
            }
        });
        
        return user;
    }
}

//Modelo de deletar usuário
class DeleteUserModel {
    async execute(id: number) {
        const userExists = await prismaClient.users.findUnique({
            where: { id: id }
        });
        
        if (!userExists) {
            throw new Error("Usuário não encontrado");
        }
        
        await prismaClient.users.delete({
            where: {
                id: id
            }
        });
        
        return { message: "Usuário deletado com sucesso" };
    }
}

export { AuthUserModel, CreateUserModel, ListUsersModel, GetUserModel, UpdateUserModel, DeleteUserModel }