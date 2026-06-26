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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListTurnosController = void 0;
const turnosModels_1 = require("../models/turnosModels");
const pagination_1 = require("../utils/pagination");
class ListTurnosController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const p = (0, pagination_1.parsePaginationParams)(request.query);
            const listTurnos = new turnosModels_1.ListTurnosModel();
            const { items, total } = yield listTurnos.execute(p);
            return response.json((0, pagination_1.paginatedResponse)(items, total, p.page, p.pageSize));
        });
    }
}
exports.ListTurnosController = ListTurnosController;
