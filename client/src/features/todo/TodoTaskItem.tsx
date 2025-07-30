import { useDispatch } from "react-redux";
import { Checked, Unchecked } from "../../img/svgsExport";
import type { TodoTaskData } from "../../types/dataTypes";
import { removeTodoTask, setTodoTaskCompleted } from "../../store/todoSlice";
import { FaTrashCan } from "react-icons/fa6";
import { useMutation } from "@tanstack/react-query";
import { apiDeleteTodoTask } from "../../services/todosApi";
import Loader from "../../pages/Loader";

export default function TodoTaskItem({
  todo,
  expired,
}: {
  todo: TodoTaskData;
  expired: boolean;
}) {
  const { mutate, isPending } = useMutation({
    mutationFn: (pkid: number) => apiDeleteTodoTask(pkid),
    onSuccess: () => removeTodoTaskLocal(todo),
  });
  const dispatch = useDispatch();
  let showTrash;
  let clickCheck;
  function handleAddTodoTask() {
    dispatch(setTodoTaskCompleted(todo.name));
  }
  function removeTodoTaskLocal(todo: TodoTaskData) {
    dispatch(removeTodoTask(todo.name));
  }
  function handleRemoveTodoTask() {
    if (todo.pkid !== null) {
      mutate(todo.pkid);
    } else {
      removeTodoTaskLocal(todo);
    }
  }
  if (!todo.is_completed && !expired) {
    showTrash = (
      <button onClick={handleRemoveTodoTask}>
        <FaTrashCan className="text-red-500" />
      </button>
    );
    clickCheck = (
      <button
        className="flex items-center justify-center"
        onClick={handleAddTodoTask}
      >
        <Unchecked />
      </button>
    );
  } else {
    clickCheck = <Unchecked />;
  }
  if (isPending) {
    <Loader />;
  }
  return (
    <div
      className={`flex items-center justify-center gap-2 ${todo.is_completed ? "bg-green-700" : "bg-red-300"
        } rounded-md px-3`}
    >
      <span>{todo.is_completed ? <Checked /> : clickCheck}</span>
      <span>{todo.name}</span>
      {showTrash}
    </div>
  );
}
