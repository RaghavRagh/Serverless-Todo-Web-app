import { useMutation } from "@tanstack/react-query";
import { AuthAPI } from "../services/api";

// Signup hook
export const useSignup = () => {
  return useMutation({
    mutationFn: async ({ name, email, password }) => {
      const { data } = await AuthAPI.post("/stageTodo/signup", {
        name,
        email,
        password,
      });
      return data;
    },
  });
};

// Confirm Signup hook
export const useConfirmSignup = () => {
  return useMutation({
    mutationFn: async ({ email, code }) => {
      const { data } = await AuthAPI.post("/stageTodo/confirm", {
        email,
        code,
      });
      return data;
    },
  });
};

// Login hook
export const useLogin = () => {
  return useMutation({
    mutationFn: async ({ email, password }) => {
      const { data } = await AuthAPI.post("/stageTodo/login", {
        email,
        password,
      });
      return data;
    },
  });
};
