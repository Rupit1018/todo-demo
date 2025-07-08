import todoService from "../services/todo.service.js";

export const createtodo = async (req, res) => {
  const { title, desc } = req.body;
  const { orgId } = req.params;
  const userId = req.userId;
  try {
    const checkOrg = await todoService.checkOrg({ orgId, userId });
    if (!checkOrg) {
      throw new Error("you are not vaild ");
    }
    const createTodo = await todoService.createTodo({
      title,
      desc,
      orgId,
      userId,
    });
    res.status(200).json({
      data: createTodo,
      message: "Successfully create todo.....!",
    });
  } catch (error) {
    res.status(404).json({
      error: error.message,
      message: "Error to create todo.....!",
    });
  }
};

export const gettodos = async (req, res) => {
  try {
    const getTodos = await todoService.getTodos();
    res.status(200).json({
      data: getTodos,
      message: "Fetched todos successfully!",
    });
  } catch (error) {
    res.status(404).json({
      error: error.message,
      message: "Error to get todos.....!",
    });
  }
};
export const gettodo = async (req, res) => {
  const { orgId } = req.params;
  const userId = req.userId;

  console.log("userId---", userId);
  console.log("orgId---", orgId);

  if (!orgId || !userId) {
    return res.status(401).json({ error: "Unauthenticated" });
  }

  try {
    const checkOrg = await todoService.checkOrg({ orgId, userId });
    if (!checkOrg) {
      return res
        .status(403)
        .json({ error: "Access denied: You don't own this organization." });
    }

    const todos = await todoService.getTodo({ orgId });
    return res.status(200).json({
      data: todos,
      message: "Fetched todos successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      message: "Failed to fetch todos.",
    });
  }
};

export const updatetodo = async (req, res) => {
  const { title, desc } = req.body;
  const { orgId, todoId } = req.params;
  const userId = req.userId;
  try {
    const checkOrg = await todoService.checkOrg({ orgId, userId });
    if (!checkOrg) {
      throw new Error("you are not owner of this org ");
    }
    const todo = await todoService.checkTodoInOrg({ todoId, orgId });
    if (!todo)
      return res.status(404).json({ error: "Todo not found in this org" });

    const updated = await todoService.updateTodo({ todoId, title, desc });
    res.status(200).json({
      data: updated,
      message: "Successfully update todo.....!",
    });
  } catch (error) {
    res.status(404).json({
      error: error.message,
      message: "Error to update todo.....!",
    });
  }
};

export const deletetodo = async (req, res) => {
  const { orgId, todoId } = req.params;
  const userId = req.userId;
  try {
    const checkOrg = await todoService.checkOrg({ orgId, userId });
    if (!checkOrg) {
      throw new Error("you are not owner of this org ");
    }
    const todo = await todoService.checkTodoInOrg({ todoId, orgId });
    if (!todo)
      return res.status(404).json({ error: "Todo not found in this org" });

    const deleteTodo = await todoService.deleteTodo({ todoId });
    res.status(200).json({
      data: deleteTodo,
      message: "Successfully delete todo.....!",
    });
  } catch (error) {
    res.status(404).json({
      error: error.message,
      message: "Error to delete todo.....!",
    });
  }
};
