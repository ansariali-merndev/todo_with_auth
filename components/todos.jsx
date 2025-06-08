"use client";

import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";

export const TodoPage = () => {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [loader, setLoader] = useState(false);

  const handleGetAllTodos = async () => {
    try {
      setLoader(true);
      const res = await fetch("/api/todos");
      const data = await res.json();
      setLoader(false);
      if (data.message === "success") {
        setTodos(data.data);
      } else {
        setTodos([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetAllTodos();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/todos", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ task }),
    });
    const data = await res.json();
    if (data.message === "success") {
      setTask("");
      handleGetAllTodos();
    }
  };

  const handleDeleteTodo = async (_id) => {
    const res = await fetch("/api/todos", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id }),
    });
    const data = await res.json();
    if (data.message === "success") {
      handleGetAllTodos();
    }
  };

  const handleToggleComplete = async (_id, completed) => {
    const res = await fetch("/api/todos", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id, completed }),
    });
    const data = await res.json();
    if (data.message === "success") {
      handleGetAllTodos();
    }
  };

  return (
    <section className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-purple-800">
          📝 Todo Application
        </h1>

        {loader && <BarLoader color="blue" width={"100%"} />}
        <form
          onSubmit={handleFormSubmit}
          className="flex items-center mb-6 gap-2"
        >
          <input
            type="text"
            required
            placeholder="Enter Your Task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            name="task"
            className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            type="submit"
            className="bg-purple-700 hover:bg-purple-800 text-white font-semibold px-4 py-2 rounded-md transition"
          >
            Add Task
          </button>
        </form>

        <ul className="space-y-3">
          {todos.map(({ _id, task, completed }, index) => (
            <li
              key={_id}
              className={`flex items-center justify-between p-3 border rounded-md ${
                completed ? "bg-green-100" : "bg-gray-50"
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={completed}
                  onChange={() => handleToggleComplete(_id, !completed)}
                  className="w-5 h-5 accent-purple-600"
                  name="completed"
                />
                <span
                  className={`text-lg ${
                    completed ? "line-through text-gray-500" : "text-gray-800"
                  }`}
                >
                  {task}
                </span>
              </div>

              <div className="flex gap-2">
                <button
                  className="px-3 py-1 text-sm bg-red-500 hover:bg-red-600 text-white rounded-md"
                  onClick={() => handleDeleteTodo(_id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
