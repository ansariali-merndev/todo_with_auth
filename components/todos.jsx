"use client";

import { useState } from "react";

export const TodoPage = () => {
  const [task, setTask] = useState("");

  const todos = [
    { task: "Learn Mongodb", completed: true },
    { task: "Learn Java", completed: false },
    { task: "Learn Python", completed: true },
  ];

  return (
    <section className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-purple-800">
          📝 Todo Application
        </h1>

        <form className="flex items-center mb-6 gap-2">
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
          {todos.map(({ task, completed }, index) => (
            <li
              key={index}
              className={`flex items-center justify-between p-3 border rounded-md ${
                completed ? "bg-green-100" : "bg-gray-50"
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={completed}
                  readOnly
                  className="w-5 h-5 accent-purple-600"
                />
                <span
                  className={`text-lg ${
                    completed ? "line-through text-gray-500" : "text-gray-800"
                  }`}
                >
                  {task}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
