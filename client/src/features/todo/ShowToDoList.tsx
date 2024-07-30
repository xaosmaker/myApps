import { useQuery } from "@tanstack/react-query";
import { apiTodosList } from "../../services/todosApi";
import TodoCard from "./TodoCard";
import { TodoData, TodoListData } from "../../types/dataTypes";
//TODO: make the statictics total remaing and finished
//TODO: should add filtering to show first the unfinished
//TODO: and show the unfinished todolist first

export default function ShowToDoList() {
  const { data: todoData, isLoading } = useQuery<TodoListData>({
    queryKey: ["todolist"],
    queryFn: apiTodosList,
  });

  if (isLoading) {
    return <div className="animate-bounce"> Loading ....</div>;
  }
  return (
    <div className=" h-[80svh] w-11/12">
      <p className="text-center text-4xl font-bold">Todos</p>
      <div className="mb-4 flex items-center justify-between  ">
        <p>Total: 125</p>
        <p>Remaining: 187</p>
        <p>Finished: 100</p>
      </div>

      <div className="grid h-5/6 gap-4 overflow-y-scroll rounded-md md:grid-cols-3 ">
        {todoData?.results.map((data: TodoData) => (
          <TodoCard key={data.pkid} todoList={data} />
        ))}
      </div>
    </div>
  );
}
