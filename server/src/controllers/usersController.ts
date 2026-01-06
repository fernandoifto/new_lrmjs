import { AuthUserModel, CreateUserModel, ForgotPasswordModel, ResetPasswordModel } from "../models/usersModels";
import { Request, Response } from "express";
import prismaClient from "../tools/prisma";

export class AuthUserController {
    async handle(request: Request, response: Response) {
        try {
            const { email, password } = request.body;
            const authUser = new AuthUserModel();
            const user = await authUser.execute({ email, password });
            return response.json(user);
        } catch (error: any) {
            return response.status(401).json({ error: error.message });
        }
    }
}

export class CreateUserController {
    async handle(request: Request, response: Response) {
        try {
            const { username, email, password } = request.body;
            const createUser = new CreateUserModel();
            const user = await createUser.execute({ username, email, password });
            return response.status(201).json(user);
        } catch (error: any) {
            return response.status(400).json({ error: error.message });
        }
    }
}

export class DetailUserController {
    async handle(request: Request, response: Response) {
        try {
            const userId = request.query.userId as string;
            
            if (!userId) {
                return response.status(401).json({ error: "User ID not found" });
            }

            const user = await prismaClient.users.findUnique({
                where: {
                    id: parseInt(userId)
                },
                select: {
                    id: true,
                    username: true,
                    email: true,
                    role: true
                }
            });

            if (!user) {
                return response.status(404).json({ error: "User not found" });
            }

            return response.json(user);
        } catch (error: any) {
            return response.status(400).json({ error: error.message });
        }
    }
}

export class ForgotPasswordController {
    async handle(request: Request, response: Response) {
        try {
            const { email } = request.body;
            const forgotPassword = new ForgotPasswordModel();
            const result = await forgotPassword.execute({ email });
            return response.json(result);
        } catch (error: any) {
            return response.status(400).json({ error: error.message });
        }
    }
}

export class ResetPasswordController {
    async handle(request: Request, response: Response) {
        try {
            const { token, password } = request.body;
            const resetPassword = new ResetPasswordModel();
            const result = await resetPassword.execute({ token, password });
            return response.json(result);
        } catch (error: any) {
            return response.status(400).json({ error: error.message });
        }
    }
}
    

