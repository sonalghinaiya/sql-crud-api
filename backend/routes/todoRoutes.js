import { Router } from "express";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import { createTodo, deleteTodo, getTodos, updateTodo } from "../controllers/todoController.js";

const router = Router()

router.post("/", isAuthenticated, createTodo)
router.get("/", isAuthenticated, getTodos)
router.put("/:id", isAuthenticated, updateTodo)
router.delete("/:id", isAuthenticated, deleteTodo)

export default router