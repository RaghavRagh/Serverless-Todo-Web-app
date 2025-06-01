// import axios from "axios";
import { Plus } from "lucide-react";
import { useState } from "react";
import TodoItem from "./TodoItem";
import { ClipLoader, PuffLoader } from "react-spinners";
import { useTodos, useAddTodo } from "../hooks/useTodos";
import { Link } from "react-router-dom";

const TodoList = () => {
  const [input, setInput] = useState("");
  const { data: todos = [], isLoading } = useTodos();
  const addTodoMutation = useAddTodo();

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    addTodoMutation.mutate(input);
    setInput("");
  };

  const userName = localStorage.getItem("name");

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-2">My Todos</h1>
        {todos.length <= 0 && (
          <p className="text-slate-600">No todos yet. Add one below!</p>
        )}
      </div>

      <form className="mb-10" onSubmit={handleAddTodo}>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="What needs to be done?"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 p-2 px-3 border border-slate-300 focus:ring-blue-500 focus:border-blue-500 rounded-lg shadow-sm outline-none"
            disabled={!userName || addTodoMutation.isLoading}
          />
          <button
            type="submit"
            size="lg"
            className="bg-blue-500 hover:bg-blue-600 text-white text-center px-6 rounded-lg shadow-sm cursor-pointer"
            disabled={!userName || addTodoMutation.isLoading}
          >
            {addTodoMutation.isLoading ? (
              <ClipLoader size={20} color="white" />
            ) : (
              <Plus className="w-5 h-5" />
            )}
          </button>
        </div>
      </form>

      <div className="py-4">
        {isLoading ? (
          <div className="flex items-center justify-center">
            <PuffLoader />
          </div>
        ) : (
          <div>
            {todos.length > 0 ? (
              todos.map((todo) => <TodoItem key={todo._id} todo={todo} />)
            ) : (
              <div className="text-center py-16">
                <div className="w-24 h-24 mx-auto mb-6 bg-slate-100 rounded-full flex items-center justify-center">
                  <Plus className="w-12 h-12 text-slate-400" />
                </div>
                <p className="text-slate-600 text-lg mb-2">No todos yet</p>
                <p className="text-slate-500">
                  {!userName && (
                    <span>
                      <Link to="/signup" className="text-blue-500">
                        Sign up
                      </Link>{" "}
                      or{" "}
                      <Link to="/login" className="text-blue-500">
                        Login
                      </Link>
                      {" - "}
                    </span>
                  )}
                  Add your first todo above to get started!
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoList;
