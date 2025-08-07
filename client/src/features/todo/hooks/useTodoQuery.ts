import { useQuery } from "@tanstack/react-query";
import type { TodoListData } from "../types/todoTypes";
import { getTodosListApi } from "../services/todoApiServices";

export function useTodoListQuery(pageParams: string) {
  const { data: todoListData, isLoading: isTodoListLoading } =
    useQuery<TodoListData>({
      queryKey: ["todolist", pageParams],
      queryFn: () => getTodosListApi(pageParams),
    });
  return { todoListData, isTodoListLoading };
}
