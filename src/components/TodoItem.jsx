// import axios from "axios";
import { Circle, CheckCircle2, CircleX, Edit2, Check } from "lucide-react";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import { useUpdateTodo, useDeleteTodo } from "../hooks/useTodos";

const TodoItem = ({ todo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editInput, setEditInput] = useState(todo.task);
  const [hovered, setHovered] = useState(false);
  const [completed, setCompleted] = useState(todo.isCompleted);

  const updateTodoMutation = useUpdateTodo();
  const deleteTodoMutation = useDeleteTodo();

  const handleUpdate = () => {
    if (!editInput.trim()) return;
    updateTodoMutation.mutate({
      todoId: todo._id,
      task: editInput,
      isCompleted: todo.isCompleted,
    });
    setIsEditing(false);
  };

  const handleDelete = () => {
    deleteTodoMutation.mutate(todo._id);
  };

  return (
    <div className={`flex items-center gap-4 w-full border border-slate-300 rounded-md py-3 mb-3 p-3 ${isEditing && "shadow-md transition-all duration-200"}`}>
      <span
        className="cursor-pointer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => setCompleted(!completed)}
      >
        {completed ? (
          <CheckCircle2 size={19} className="text-green-500" />
        ) : hovered ? (
          <CheckCircle2 size={19} className="text-slate-400" />
        ) : (
          <Circle size={19} className="text-slate-500" />
        )}
      </span>

      {isEditing ? (
        <input
          type="text"
          value={editInput}
          onChange={(e) => setEditInput(e.target.value)}
          onBlur={handleUpdate}
          autoFocus
          className="flex-1 p-1 outline-none transition-all duration-200"
        />
      ) : (
        <p
          className={`flex-1 transition-all duration-200 ${
            completed ? "line-through text-slate-400" : ""
          } cursor-pointer`}
          onDoubleClick={() => setIsEditing(true)}
        >
          {todo.task}
        </p>
      )}

      <span
        className="cursor-pointer"
        onClick={() => (isEditing ? handleUpdate() : setIsEditing(true))}
      >
        {isEditing ? (
          <Check size={19} className="text-blue-500 hover:text-blue-600" />
        ) : (
          <Edit2 size={19} className="text-slate-400 hover:text-slate-600" />
        )}
      </span>

      <span className="ml-auto cursor-pointer" onClick={handleDelete}>
        {deleteTodoMutation.isLoading ? (
          <ClipLoader size={20} color="red" />
        ) : (
          <CircleX
            size={19}
            className="text-red-400 hover:text-red-500 transition-colors"
          />
        )}
      </span>
    </div>
  );
};

export default TodoItem;
