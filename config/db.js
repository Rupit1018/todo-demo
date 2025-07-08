import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import { userModel } from "../models/user.model.js";
import { orgModel } from "../models/org.model.js";
import { todoModel } from "../models/todo.model.js";
dotenv.config();
export const sequelize = new Sequelize(
  process.env.PGDATABASE,
  process.env.PGUSER,
  process.env.PGPASSWORD,
  {
    host: "localhost",
    dialect: "postgres",
  }
);
export const User = userModel(sequelize);
export const Org = orgModel(sequelize);
export const Todo = todoModel(sequelize);
await sequelize.sync({ alter: true });
export const connect = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
