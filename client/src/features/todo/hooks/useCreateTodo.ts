import { useMutation } from "@tanstack/react-query";
import type { TodoData } from "../types/todoTypes";
import { createTodoItemApi } from "../services/todoApiServices";
import { queryClient } from "@/queryClient";

export function useCreateTodo() {
  const {
    mutate: createTodoItemMutate,
    isPending: isCreateTodoItemLoading,
    isSuccess: isCreateTodoSuccess,
  } = useMutation({
    mutationFn: (data: TodoData) => createTodoItemApi(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });
  return { createTodoItemMutate, isCreateTodoItemLoading, isCreateTodoSuccess };
}
