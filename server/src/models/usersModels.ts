import prismaClient from "../tools/prisma";
import bcrypt from "bcryptjs";
import { sign } from "jsonwebtoken";

interface IUser {
    username: string;
    email: string;
    password: string;
}

interface IAuthUser {
    email: string;
    password: string;
}

export class AuthUserModel {
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

export class CreateUserModel {
    async execute({ username, email, password }: IUser) {
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
                password: passwordHash
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
    

    