import { useQuery } from "@tanstack/react-query";
import { apiTodosList } from "../../services/todosApi";
import TodoCard from "./TodoCard";
import { TodoData, TodoListData } from "../../types/dataTypes";
import usePagePaginationParams from "../../utils/UsePagePaginationParams";
import Pagination from "../../components/Pagination";

export default function ShowToDoList() {
  const pageParams = usePagePaginationParams();

  const { data: todoData, isLoading } = useQuery<TodoListData>({
    queryKey: ["todolist", pageParams],
    queryFn: () => apiTodosList(pageParams),
  });
  const total = todoData?.count || 0;
  const remaining = todoData?.all_pending_todo || 0;
  const completed = todoData?.all_completed_todo || 0;
  const failed = todoData?.all_failed_todo || 0;

  if (isLoading) {
    return <div className="animate-bounce"> Loading ....</div>;
  }
  return (
    <div className=" h-[80svh] w-11/12">
      <p className="text-center text-4xl font-bold uppercase">Todos</p>
      <div className=" my-4 grid uppercase md:grid-cols-4 ">
        <p>Total: {total}</p>
        <p className="font-semibold text-yellow-600">
          Pending: {((remaining / total) * 100).toFixed(2)}%
        </p>
        <p className="font-semibold text-green-600">
          Success: {((completed / total) * 100).toFixed(2)}%
        </p>
        <p className="font-semibold text-red-600">
          failed: {((failed / total) * 100).toFixed(2)}%
        </p>
      </div>

      <div className="grid h-3/5 md:h-4/5 gap-4 overflow-y-scroll rounded-md md:grid-cols-3 ">
        {todoData?.results.map((data: TodoData) => (
          <TodoCard key={data.pkid} todoList={data} />
        ))}
      </div>
      <Pagination
        currentPage={todoData?.current_page || 1}
        totalPages={todoData?.total_pages || 1}
      />
    </div>
  );
}
