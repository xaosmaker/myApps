import { useQuery } from "@tanstack/react-query";
import { apiTodosList } from "../../services/todosApi";
import TodoCard from "./TodoCard";
import { TodoData, TodoListData } from "../../types/dataTypes";
//TODO: make the statictics total remaing and finished

export default function ShowToDoList() {
  const { data: todoData, isLoading } = useQuery<TodoListData>({
    queryKey: ["todolist"],
    queryFn: apiTodosList,
  });
  const total = todoData?.results.length || 0;
  const remaining =
    todoData?.results.filter(
      (data) =>
        data.expired === false &&
        data.completed === false &&
        data.completed_in_time === false
    ).length || 0;
  const completed =
    todoData?.results.filter((data) => data.completed === true).length || 0;
  const failed =
    todoData?.results.filter((data) => data.expired === true).length || 0;

  if (isLoading) {
    return <div className="animate-bounce"> Loading ....</div>;
  }
  return (
    <div className=" h-[80svh] w-11/12">
      <p className="text-center text-4xl font-bold uppercase">Todos</p>
      <div className=" my-4 grid uppercase md:grid-cols-4 ">
        <p>Total: {total}</p>
        <p className="font-semibold text-yellow-600">
          Pending: {Math.round((remaining / total) * 100)}%
        </p>
        <p className="font-semibold text-green-600">
          Success: {Math.round((completed / total) * 100)}%
        </p>
        <p className="font-semibold text-red-600">
          failed: {Math.round((failed / total) * 100)}%
        </p>
      </div>

      <div className="grid h-5/6 gap-4 overflow-y-scroll rounded-md md:grid-cols-3 ">
        {todoData?.results.map((data: TodoData) => (
          <TodoCard key={data.pkid} todoList={data} />
        ))}
      </div>
    </div>
  );
}
