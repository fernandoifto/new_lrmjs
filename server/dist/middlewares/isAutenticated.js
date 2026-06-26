"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = isAuthenticated;
require("../types/express-augment");
const jsonwebtoken_1 = require("jsonwebtoken");
const prisma_1 = __importDefault(require("../tools/prisma"));
const jwtOptions_1 = require("../config/jwtOptions");
const getAuthToken_1 = require("./getAuthToken");
function isAuthenticated(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = (0, getAuthToken_1.getAuthTokenFromRequest)(request);
        if (!token) {
            return response.status(401).end();
        }
        try {
            const { sub } = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET, jwtOptions_1.JWT_VERIFY_OPTIONS);
            const userId = Number(sub);
            // Verificar se o usuário existe e está ativo
            const user = yield prisma_1.default.users.findUnique({
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
        }
        catch (error) {
            return response.status(401).end();
        }
    });
}
