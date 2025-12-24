import prismaClient from "../tools/prisma";
import bcrypt from "bcryptjs";
import { sign } from "jsonwebtoken";

interface IUser {
    username: string;
    email: string;
    password: string;
}

export class AuthUserModel {
    async execute({ username, email, password }: IUser) {

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
        const userAlreadyExists = await prismaClient.users.findFirst({
            where: {
                email: email
            }
        });

        if(userAlreadyExists){
            throw new Error("User already exists");
        }

        const user = await prismaClient.users.create({
            data: {
                username: username,
                email: email,
                password: password
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
    

    