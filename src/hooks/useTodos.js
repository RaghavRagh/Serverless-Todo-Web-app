import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import API from "../services/api";

// get all todos
export const useTodos = () =>
  useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const res = await API.get("/stageTodo/getTodo");
      return res.data;
    },
  });

// add a new todo
export const useAddTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (task) => {
      const res = await API.post("/stageTodo/addTodo", { task });
      return res.data.todo;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
    },
  });
};

// update an existing todo
export const useUpdateTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (updatedTodo) => {
      const res = await API.put("/stageTodo/updateTodo", updatedTodo);
      return res.data.todo;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
    },
  });
};

// delete a todo
export const useDeleteTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      await API.delete("/stageTodo/deleteTodo", { data: { todoId: id } });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
    },
  });
};
