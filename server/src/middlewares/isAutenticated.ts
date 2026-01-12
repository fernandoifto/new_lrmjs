import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import prismaClient from "../tools/prisma";

interface IPayload {
    sub: string;
}

export async function isAuthenticated(request: Request, response: Response, next: NextFunction) {
    const authToken = request.headers.authorization;
    
    if (!authToken) {
        return response.status(401).end();
    }
    
    const token = authToken.split(" ")[1];
    
    try {
        const { sub } = verify(token, process.env.JWT_SECRET as string) as IPayload;
        const userId = Number(sub);
        
        // Verificar se o usuário existe e está ativo
        const user = await prismaClient.users.findUnique({
            where: { id: userId }
        });

        if (!user) {
            return response.status(401).end();
        }

        request.query.userId = sub;
        // Adicionar informações do usuário ao request para uso posterior
        (request as any).user = {
            id: user.id,
            is_admin: user.is_admin
        };
        
        return next();
    } catch (error) {
        return response.status(401).end();
    }
}
    