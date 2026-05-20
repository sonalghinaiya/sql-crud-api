import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaEdit, FaTrash, FaEllipsisV } from "react-icons/fa";
import api from "../api/api";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [showDelete, setShowDelete] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const fetchTasks = async () => {
    try {
      const res = await api.get("/todos", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("------------",res.data.data)
      setTasks(res.data.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load task");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async () => {
    try {
      await api.delete(`/todos/${selectedTask}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Task deleted successfully");
      setShowDelete(false);
      fetchTasks();
    } catch {
      toast.error(error.response?.data?.message || "Delete failed");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const statusStyle = {
    pending: "bg-gray-200 text-gray-700",
    completed: "bg-green-200 text-green-800",
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Tasks</h1>
          <p className="text-gray-500">{tasks.length} tasks total</p>
        </div>

        <div className="flex gap-3">
          <Link to="/task/add">
            <button className="px-2 py-1.5 mt-4 rounded-lg bg-black text-white">+ New Task</button>
          </Link>

          <button
            onClick={() => setShowLogout(true)}
            className="px-2 py-1.5 mt-4 rounded-lg text-white bg-red-500 hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {tasks.length === 0 ? (
          <p className="text-center text-gray-500">No tasks found</p>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className="bg-white p-4 rounded-xl shadow flex justify-between items-center"
            >
              <div>
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    statusStyle[task.status]
                  }`}
                >
                  {task.status}
                </span>

                <h3 className="font-semibold mt-2">{task.title}</h3>
                <p className="text-sm text-gray-500">{task.description}</p>

                <p className="text-xs text-gray-400 mt-2">
                  {new Date(task.created_at).toDateString()}
                </p>
              </div>

              <div className="flex gap-4 text-gray-500">
                <button
                  onClick={() => navigate(`/task/edit/${task.id}`)}
                  className="hover:text-blue-600"
                >
                  <FaEdit />
                </button>

                <button
                  onClick={() => {
                    setSelectedTask(task.id);
                    setShowDelete(true);
                  }}
                  className="hover:text-red-600"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {showDelete && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow w-80">
            <h2 className="text-lg font-semibold mb-2">Delete Task?</h2>
            <p className="text-sm text-gray-500 mb-4">
              Are you sure you want to delete this task?
            </p>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowDelete(false)}
                className="px-2 py-1.5 mt-4 rounded-lg text-white bg-gray-400"
              >
                Cancel
              </button>

              <button onClick={handleDelete} className="px-2 py-1.5 mt-4 rounded-lg text-white bg-red-500">
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {showLogout && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow w-80">
            <h2 className="text-lg font-semibold mb-2">Logout?</h2>
            <p className="text-sm text-gray-500 mb-4">
              Are you sure you want to logout?
            </p>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowLogout(false)}
                className="px-2 py-1.5 mt-4 rounded-lg text-white bg-gray-400"
              >
                Cancel
              </button>

              <button onClick={handleLogout} className="px-2 py-1.5 mt-4 rounded-lg text-white bg-red-500">
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;