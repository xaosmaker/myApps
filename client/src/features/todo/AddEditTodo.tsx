import { useQuery } from "@tanstack/react-query";
import { apiTodo } from "../../services/todosApi";
import { useParams } from "react-router-dom";
import { dateToGRformat } from "../../utils/helperFunctions";
import { useEffect } from "react";
import TodoItem from "./TodoItem";
import Loader from "../../pages/Loader";
import { Checked, Unchecked } from "../../img/svgsExport";
import { TodoData } from "../../types/dataTypes";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { setTodoState } from "../../store/todoSlice";

export default function AddEditTodo() {
  const { pkid } = useParams();
  const dispatch = useDispatch();
  const { data: todoData, isLoading } = useQuery<TodoData>({
    queryKey: ["todos", pkid],
    queryFn: () => apiTodo(pkid),
    enabled: pkid !== undefined,
  });
  const todo = useSelector((state: RootState) => state.todo);

  useEffect(() => {
    if (todoData) {
      dispatch(setTodoState(todoData));
    }
  }, [dispatch, todoData]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className=" h-5/6 w-10/12">
      <div className="mb-10 ">
        <div className="flex items-center justify-center gap-4">
          <p>{todo?.completed ? <Checked /> : <Unchecked />}</p>
          <h3 className="text-2xl ">{todo?.title}</h3>
        </div>
        <p className=" mt-10 flex items-center justify-center gap-4">
          <span className="capitalize">Expires at:</span>
          {dateToGRformat(todo?.complete_until)}
        </p>
      </div>
      <div className=" flex max-h-[75%] flex-wrap gap-x-4 gap-y-2 overflow-y-scroll rounded-sm bg-slate-600 p-2 ">
        {todo.todo_tasks?.map((data) => (
          <TodoItem key={data.pkid} todo={data} />
        ))}
      </div>
    </div>
  );
}
