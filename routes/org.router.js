import { Router } from "express";
import {
  createorg,
  updateorg,
  getOrgs,
  deleteorg,
  getOrg,
} from "../controllers/org.controller.js";
import authenticate from "../middlewere/auth.middlewere.js";
const orgRouter = Router();

orgRouter.get("/getorgs", getOrgs);
orgRouter.get("/getorg", authenticate, getOrg);
orgRouter.post("/createorg", authenticate, createorg);
orgRouter.put("/updateorg/:id", authenticate, updateorg);
orgRouter.delete("/deleteorg/:id", authenticate, deleteorg);

export default orgRouter;
