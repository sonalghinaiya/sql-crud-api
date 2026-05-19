import db from "../config/db.js";

export const createTodo = async (req, res) => {
  try {
    const { title, description, status } = req.body;

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

export const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const { title, description, status } = req.body;

    const sql = "UPDATE todos SET title=?,description=?,status=? WHERE id=?";

    db.query(sql, [title, description, status, id], (err, result) => {
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
    });
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

    const sql = "DELETE FROM todos WHERE id=?";

    db.query(sql, [id], (err, result) => {
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
