import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
    sub: string;
}

export function isAuthenticated(request: Request, response: Response, next: NextFunction) {
    const authToken = request.headers.authorization;
    
    if (!authToken) {
        return response.status(401).end();
    }
    
    const token = authToken.split(" ")[1];
    
    try {
        const { sub } = verify(token, process.env.JWT_SECRET as string) as IPayload;
        request.query.userId = sub;
        return next();
    } catch (error) {
        return response.status(401).end();
    }
}
    