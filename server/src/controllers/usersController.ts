import { AuthUserModel, CreateUserModel } from "../models/usersModels";
import { Request, Response } from "express";

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
    

