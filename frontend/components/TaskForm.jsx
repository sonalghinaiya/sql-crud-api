import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaArrowLeft } from "react-icons/fa";
import api from "../src/api/api";

function TaskForm({ taskId }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const isEdit = Boolean(taskId);
  useEffect(() => {
    if (!taskId) return;

    const fetchTasks = async () => {
      try {
        const res = await api.get(`/todos/${taskId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const task = res.data.data;

        setTitle(task.title);
        setDescription(task.description);
        setStatus(task.status);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to load task");
      }
    };
    fetchTasks();
  }, [taskId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;
    setLoading(true);
    try {
      if (isEdit) {
        await api.put(
          `/todos/${taskId}`,
          { title, description, status },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        toast.success("Task updated successfully");
      } else {
        await api.post(
          "/todos",
          { title, description, status },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        toast.success("Task created successfully");
      }
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 px-4">
      <div className="bg-white p-5 rounded-lg shadow-sm flex items-center justify-between mb-5">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-muted"
          >
            <FaArrowLeft />
          </button>
          <div>
            <h1 className="text-xl font-bold tracking-tight">
              {isEdit ? "Edit Task" : "Create Task"}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              {isEdit
                ? "Update your task details"
                : "Add a new task to your list"}
            </p>
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-6 rounded-lg shadow-sm"
      >
        <div className="space-y-2">
          <label className="text-sm font-medium">Title</label>
          <input
            type="text"
            value={title}
            className="w-full border border-gray-300 p-2 rounded-lg ms-1.5 mt-1 resize-none bg-gray-50"
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What needs to be done?"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Description</label>
          <textarea
            placeholder="Add more details about this task..."
            value={description}
            name="description"
            className="w-full border border-gray-300 p-2 rounded-lg ms-1.5 mt-1 resize-none h-24 bg-gray-50"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>
          <label className="text-sm font-semibold">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-lg ms-1.5 mt-1 bg-gray-50"
          >
            <option value="pending">To Do</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full px-2 py-1.5 mt-4 rounded-lg bg-black text-white"
          loading={loading}
        >
          {isEdit ? "Update" : "Save"} Task
        </button>
      </form>
    </div>
  );
}

export default TaskForm;
