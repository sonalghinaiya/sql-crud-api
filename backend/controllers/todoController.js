import db from "../config/db.js";
import { todoSchema } from "../validations/todoValidation.js";

export const createTodo = async (req, res) => {
  try {
    const result = todoSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        errors: result.error.errors,
      });
    }

    const { title, description, status } = result.data;

    const userId = req.user.id;

    const sql =
      "INSERT INTO todos(title,description,status,user_id) VALUES(?,?,?,?)";

    db.query(sql, [title, description, status, userId], (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          error: err,
        });
      }

      res.status(201).json({
        success: true,
        message: "Todo Created successfully",
      });
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const getTodos = async (req, res) => {
  try {
    const userId = req.user.id;

    const sql = "SELECT * FROM todos WHERE user_id=?";

    db.query(sql, [userId], (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          error: err,
        });
      }

      res.json({
        success: true,
        data: result,
      });
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const getTodoById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const sql = "SELECT * FROM todos WHERE id=? AND user_id=?"

    db.query(sql, [id, userId], (err, result) => {
      if(err) {
        return res.status(500).json({
          success: false,
          message: "Todo not found"
        })
      }

      res.status(200).json({
        success: true,
        data: result[0]
      })
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const result = todoSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        errors: result.error.errors,
      });
    }

    const { title, description, status } = result.data;

    const sql =
      "UPDATE todos SET title=?,description=?,status=? WHERE id=? AND user_id=?";

    db.query(
      sql,
      [title, description, status, id, req.user.id],
      (err, result) => {
        if (err) {
          return res.status(500).json({
            success: false,
            error: error.message,
          });
        }

        res.json({
          success: true,
          message: "Todo Updated successfully",
        });
      },
    );
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const sql = "DELETE FROM todos WHERE id=? AND user_id=?";

    db.query(sql, [id, req.user.id], (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          error: error.message,
        });
      }

      res.json({
        success: true,
        message: "Task deleted successfully",
      });
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
