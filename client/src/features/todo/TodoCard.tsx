import { useQuery } from "@tanstack/react-query";
import { apiTodosList } from "../../services/todosApi";
import type { TodoData, TodoListData } from "../../types/dataTypes";
import Pagination from "../../components/Pagination";
import CardLayout from "../../components/card/CardLayout";
import Card from "../../components/card/Card";
import { Checked, Unchecked } from "../../img/svgsExport";
import { dateToGRformat } from "../../utils/helperFunctions";
import TodoCardItem from "./TodoCardItem";
import usePagePaginationParams from "../../hooks/usePagePaginationParams";

export default function TodoCard() {
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
    <CardLayout>
      <CardLayout.Header className="">
        <CardLayout.Title>Todos</CardLayout.Title>
        <div className=" my-4 grid justify-items-center uppercase md:grid-cols-4 ">
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
      </CardLayout.Header>

      <CardLayout.Body className="h-1/2 md:h-4/6 md:grid-cols-3">
        {todoData?.results.map((data: TodoData) => (
          <Card key={data.pkid} link={`/todos/${data.pkid}/add-edit-todo`}>
            <Card.Title
              className={`flex items-center justify-center ${data.completed_in_time ? "bg-green-900" : "bg-slate-800"
                } ${data.expired ? "bg-red-800" : null} px-2 py-2 `}
            >
              <p>{data.completed ? <Checked /> : <Unchecked />}</p>
              <div className=" flex w-full flex-col items-center justify-center   gap-2 ">
                <h3 className="mx-auto text-xl font-semibold capitalize">
                  {data.title}
                </h3>
                <p className="text-sm">
                  {data.expired ? (
                    <span className="uppercase">Expired</span>
                  ) : (
                    <span>
                      <span className="mr-1 uppercase">
                        {data.completed ? "completed:" : "expires:"}
                      </span>
                      {dateToGRformat(data.complete_until)}
                    </span>
                  )}
                </p>
              </div>
            </Card.Title>
            <Card.Body>
              {data?.todo_tasks?.slice(0, 10).map((todo) => (
                <TodoCardItem key={todo.pkid} todo={todo} />
              ))}
            </Card.Body>
          </Card>
        ))}
      </CardLayout.Body>
      <Pagination
        currentPage={todoData?.current_page || 1}
        totalPages={todoData?.total_pages || 1}
      />
    </CardLayout>
  );
}
