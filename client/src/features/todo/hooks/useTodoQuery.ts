import { useQuery } from "@tanstack/react-query";
import type { TodoData } from "../types/todoTypes";
import { getSingleTodoApi } from "../services/todoApiServices";

export function useTodoQuery(pkid: string) {
  const { data: singleTodoData, isLoading: isTodoLoading } = useQuery<TodoData>(
    {
      queryKey: ["todos", pkid],
      queryFn: () => getSingleTodoApi(pkid),
      enabled: pkid !== undefined,
    },
  );
  return { singleTodoData, isTodoLoading };
}
