import { useMutation } from "@tanstack/react-query";
import type { TodoTaskData } from "../types/todoTypes";
import { finishTodoItemApi } from "../services/todoApiServices";
import { queryClient } from "@/queryClient";

export function useUpdateTodo() {
  const { mutate } = useMutation({
    mutationFn: (data: TodoTaskData) => finishTodoItemApi(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });

  const updateTodoMutate = (data: TodoTaskData) => () => {
    mutate(data);
  };
  return { updateTodoMutate };
}
