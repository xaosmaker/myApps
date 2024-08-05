import { useDispatch } from "react-redux";
import { Checked, Unchecked } from "../../img/svgsExport";
import { TodoTaskData } from "../../types/dataTypes";
import { setTodoTaskCompleted } from "../../store/todoSlice";
import { FaTrashCan } from "react-icons/fa6";

export default function TodoTaskItem({ todo }: { todo: TodoTaskData }) {
  const dispatch = useDispatch();
  function handleAddClick() {
    console.log("click");
    console.log("name", todo.name);
    dispatch(setTodoTaskCompleted(todo.name));
  }
  return (
    <div
      className={`flex items-center justify-center gap-2 ${
        todo.is_completed ? "bg-green-700" : "bg-red-300"
      } rounded-md px-3`}
    >
      <span>
        {todo.is_completed ? (
          <Checked />
        ) : (
          <button
            className="flex justify-center items-center"
            onClick={handleAddClick}
          >
            <Unchecked />
          </button>
        )}
      </span>
      <span>{todo.name}</span>
      {todo.is_completed ? null : (
        <button>
          <FaTrashCan className="text-red-500" />
        </button>
      )}
    </div>
  );
}
