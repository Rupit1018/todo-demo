import { Router } from "express";
import authenticate from "../middlewere/auth.middlewere.js";
import {
  createtodo,
  gettodos,
  gettodo,
  updatetodo,
  deletetodo,
} from "../controllers/todo.controller.js";
const todoRouter = Router();

todoRouter.post("/createtodo/:orgId", authenticate, createtodo);
todoRouter.get("/gettodos", gettodos);
todoRouter.get("/gettodo/:orgId", authenticate, gettodo);
todoRouter.put("/updatetodo/:orgId/todo/:todoId", authenticate, updatetodo);
todoRouter.delete("/deletetodo/:orgId/todo/:todoId", authenticate, deletetodo);

export default todoRouter;
