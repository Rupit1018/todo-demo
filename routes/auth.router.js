import { Router } from "express";
import {
  signup,
  login,
  forgotPassword,
  resetPassword,
} from "../controllers/auth.controller.js";
const authRouter = Router();

authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.post("/forgot-password", forgotPassword);
authRouter.get("/reset-password", resetPassword);

export default authRouter;
