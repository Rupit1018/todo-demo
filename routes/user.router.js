import { Router } from "express";
import { getUsers,updateProfile } from "../controllers/user.controller.js";
import authenticate from "../middlewere/auth.middlewere.js";

const userRouter = Router();

userRouter.get("/getusers", authenticate, getUsers);
userRouter.put("/update-profile", authenticate, updateProfile);

export default userRouter;
