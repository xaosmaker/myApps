import { useTodoListQuery } from "../hooks/useTodoListQuery";
import usePagePaginationParams from "../../../hooks/usePagePaginationParams";
import CustomPagination from "@/components/CustomPagination";
import TodoCard from "../components/TodoCard";
import { useNavigate } from "react-router-dom";

export default function TodoList() {
  const navigate = useNavigate();
  const paginationParams = usePagePaginationParams();
  const { todoListData, isTodoListLoading } =
    useTodoListQuery(paginationParams);

  const onClickNavigate = (location: string) => () => {
    navigate(location);
  };

  const total = todoListData?.count || 10;
  const remaining = todoListData?.all_pending_todo || 5;
  const completed = todoListData?.all_completed_todo || 2;
  const failed = todoListData?.all_failed_todo || 3;
  //{`/todos/${data.pkid}/add-edit-todo`}
  //
  if (isTodoListLoading) {
    return <div className="animate-bounce"> Loading ....</div>;
  }
  return (
    <div className="h-full overflow-y-auto">
      <div className="sticky top-0 col-span-full flex flex-col justify-around py-4 text-center backdrop-blur-lg sm:flex-row">
        <p>Total: {total}</p>
        <>
          <p className="font-semibold text-yellow-600">
            Pending: {((remaining / total) * 100).toFixed(2)}%
          </p>
          <p className="font-semibold text-green-600">
            Success: {((completed / total) * 100).toFixed(2)}%
          </p>
          <p className="font-semibold text-red-600">
            failed: {((failed / total) * 100).toFixed(2)}%
          </p>
        </>
      </div>
      <div className="mb-4 grid w-full auto-rows-min grid-cols-[repeat(auto-fill,_minmax(14rem,_1fr))] gap-4 p-4">
        {todoListData?.results.map((todolist) => {
          return (
            <TodoCard
              key={todolist.pkid}
              goto={onClickNavigate(`/todos/${todolist.pkid}/add-edit-todo`)}
              data={todolist}
            />
          );
        })}
      </div>
      <CustomPagination
        totalPages={todoListData?.total_pages || 1}
        currentPage={todoListData?.current_page || 1}
      />
    </div>
  );
}
