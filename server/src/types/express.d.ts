import { Multer } from 'multer';

declare global {
    namespace Express {
        interface AuthenticatedUser {
            id: number;
            is_admin: boolean;
        }

        interface Request {
            files?: Express.Multer.File[];
            user?: AuthenticatedUser;
        }
    }
}
