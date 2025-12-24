import { Router } from "express";
import { CreateAgendamentosController } from "./controllers/agendamentosController";
import { ListTurnosController } from "./controllers/turnosController";
import { AuthUserController, CreateUserController } from "./controllers/usersController";

const router = Router();

//Rotas de agendamentos
router.post("/agendamento", new CreateAgendamentosController().handle);

//Rotas de turnos
router.get("/turnos", new ListTurnosController().handle);

//Rotas de users
router.post("/auth", new AuthUserController().handle);
router.post("/user", new CreateUserController().handle);

export default router;