import { useMutation, useQuery } from "@tanstack/react-query";
import { apiPatchTodos, apiTodo } from "../../services/todosApi";
import { useParams } from "react-router-dom";
import { dateToGRformat } from "../../utils/helperFunctions";
import { useEffect, useState } from "react";
import Loader from "../../pages/Loader";
import { Checked, Unchecked } from "../../img/svgsExport";
import { type TodoData } from "../../types/dataTypes";
import { useDispatch, useSelector } from "react-redux";
import { type RootState } from "../../store/store";
import { addTodoTask, setTodoState } from "../../store/todoSlice";
import TodoTaskItem from "./TodoTaskItem";
import Button from "../../ui/Button";

export default function AddEditTodoTask() {
  const { mutate, isPending: mutateIsLoading } = useMutation({
    mutationFn: (data: TodoData) => apiPatchTodos(data),
  });
  const { pkid } = useParams();
  const dispatch = useDispatch();
  const { data: todoData, isLoading } = useQuery<TodoData>({
    queryKey: ["todos", pkid],
    queryFn: () => apiTodo(pkid),
    enabled: pkid !== undefined,
  });
  const [todoInput, setTodoInput] = useState<string>("");
  const todo = useSelector((state: RootState) => state.todo);
  function handleAddTodoTask() {
    if (todoInput !== "") {
      dispatch(addTodoTask(todoInput));
      setTodoInput("");
    }
  }
  function handleSave() {
    mutate(todo);
  }

  useEffect(() => {
    if (todoData) {
      dispatch(setTodoState(todoData));
    }
  }, [dispatch, todoData]);

  if (isLoading || mutateIsLoading) {
    return <Loader />;
  }
  const showAddButtons = todo.completed || todo.expired;

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
      {!showAddButtons && (
        <div className="mb-2 flex justify-between">
          <Button type="button" onClick={handleSave}>
            Save
          </Button>
          <div className="flex items-center justify-center gap-4">
            <input
              onChange={(e) => setTodoInput(e.target.value)}
              value={todoInput}
              className="w-full border-none bg-transparent"
              name="addTodo"
              placeholder="Add Todo"
            />
            <Button type="button" onClick={handleAddTodoTask}>
              Add todo
            </Button>
          </div>
        </div>
      )}
      <div className=" flex max-h-[75%] flex-wrap gap-x-4 gap-y-2 overflow-y-scroll rounded-sm bg-slate-600 p-2 ">
        {todo.todo_tasks.length !== 0 ? (
          todo.todo_tasks?.map((data) => (
            <TodoTaskItem key={data.name} todo={data} expired={todo.expired} />
          ))
        ) : (
          <div> pls add todo</div>
        )}
      </div>
    </div>
  );
}
