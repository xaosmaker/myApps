import { Checked, Unchecked } from "../../img/svgsExport";
import { Todos } from "../../types/dataTypes";

export default function TodoItem({ todo }: { todo: Todos }) {
  return (
    <div className="flex items-center justify-center gap-1 bg-red-400 px-2">
      <span>{todo.is_completed ? <Checked /> : <Unchecked />}</span>
      <span>{todo.name}</span>
      <button>X</button>
    </div>
  );
}
