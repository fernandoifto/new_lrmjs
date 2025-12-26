import { AuthUserModel, CreateUserModel } from "../models/usersModels";
import { Request, Response } from "express";

export class AuthUserController {
    async handle(request: Request, response: Response) {
        const { username, email, password } = request.body;
        const authUser = new AuthUserModel();
        const user = await authUser.execute({ username, email, password });
        return response.json(user);
    }
}

export class CreateUserController {
    async handle(request: Request, response: Response) {
        const { username, email, password } = request.body;
        const createUser = new CreateUserModel();
        const user = await createUser.execute({ username, email, password });
        return response.json(user);
    }
}
    

