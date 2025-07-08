import { sequelize } from "../config/db.js";
import { todoModel } from "../models/todo.model.js";
import { orgModel } from "../models/org.model.js";
const Todo = todoModel(sequelize);
const Org = orgModel(sequelize);
const checkOrg = async ({ orgId, userId }) => {
  return await Org.findOne({ where: { id: orgId, userId } });
};
const createTodo = async ({ title, desc, orgId, userId }) => {
  return await Todo.create({ title, desc, orgId, userId });
};

const getTodos = async () => {
  return await Todo.findAll();
};

export const getTodo = async ({ orgId }) => {
  return await Todo.findAll({ where: { orgId } });
};
export const checkTodoInOrg = async ({ todoId, orgId }) => {
  return await Todo.findOne({ where: { id: todoId, orgId } });
};
export const updateTodo = async ({ todoId, title, desc }) => {
  await Todo.update(
    { title, desc },
    {
      where: { id: todoId },
    }
  );

  return await Todo.findOne({ where: { id: todoId } });
};

const deleteTodo = async ({ todoId }) => {
  return await Todo.destroy({ where: { id: todoId } });
};
export default {
  createTodo,
  checkOrg,
  getTodos,
  getTodo,
  updateTodo,
  checkTodoInOrg,
  deleteTodo,
};
