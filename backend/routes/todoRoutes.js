import { Router } from "express";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import { createTodo, deleteTodo, getTodoById, getTodos, updateTodo } from "../controllers/todoController.js";

const router = Router()

router.post("/", isAuthenticated, createTodo)
router.get("/", isAuthenticated, getTodos)
router.get("/:id", isAuthenticated, getTodoById)
router.put("/:id", isAuthenticated, updateTodo)
router.delete("/:id", isAuthenticated, deleteTodo)

export default router