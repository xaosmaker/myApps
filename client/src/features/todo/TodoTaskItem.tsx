import { useDispatch } from "react-redux";
import { Checked, Unchecked } from "../../img/svgsExport";
import { TodoTaskData } from "../../types/dataTypes";
import { setTodoTaskCompleted } from "../../store/todoSlice";
import { FaTrashCan } from "react-icons/fa6";

export default function TodoTaskItem({
  todo,
  expired,
}: {
  todo: TodoTaskData;
  expired: boolean;
}) {
  const dispatch = useDispatch();
  let showTrash;
  let clickCheck;
  function handleAddClick() {
    dispatch(setTodoTaskCompleted(todo.name));
  }
  if (!todo.is_completed && !expired) {
    showTrash = (
      <button>
        <FaTrashCan className="text-red-500" />
      </button>
    );
    clickCheck = (
      <button
        className="flex items-center justify-center"
        onClick={handleAddClick}
      >
        <Unchecked />
      </button>
    );
  } else {
    clickCheck = <Unchecked />;
  }
  return (
    <div
      className={`flex items-center justify-center gap-2 ${
        todo.is_completed ? "bg-green-700" : "bg-red-300"
      } rounded-md px-3`}
    >
      <span>{todo.is_completed ? <Checked /> : clickCheck}</span>
      <span>{todo.name}</span>
      {showTrash}
    </div>
  );
}
