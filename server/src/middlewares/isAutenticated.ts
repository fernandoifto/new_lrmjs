import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import prismaClient from "../tools/prisma";
import { JWT_VERIFY_OPTIONS } from "../config/jwtOptions";
import { getAuthTokenFromRequest } from "./getAuthToken";

interface IPayload {
    sub: string;
}

export async function isAuthenticated(request: Request, response: Response, next: NextFunction) {
    const token = getAuthTokenFromRequest(request);

    if (!token) {
        return response.status(401).end();
    }
    
    try {
        const { sub } = verify(token, process.env.JWT_SECRET as string, JWT_VERIFY_OPTIONS) as IPayload;
        const userId = Number(sub);
        
        // Verificar se o usuário existe e está ativo
        const user = await prismaClient.users.findUnique({
            where: { id: userId }
        });

        if (!user) {
            return response.status(401).end();
        }

        request.query.userId = sub;
        // Reuse user info in downstream middlewares/controllers.
        request.user = {
            id: user.id,
            is_admin: user.is_admin
        };
        
        return next();
    } catch (error) {
        return response.status(401).end();
    }
}
    