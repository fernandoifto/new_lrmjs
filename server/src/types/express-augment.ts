declare global {
    namespace Express {
        interface AuthenticatedUser {
            id: number;
            is_admin: boolean;
        }

        interface Request {
            user?: AuthenticatedUser;
        }
    }
}

export {};
