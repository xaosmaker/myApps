import { Checked, Unchecked } from "../../img/svgsExport";
import { TodoTaskData } from "../../types/dataTypes";

export default function TodoCardItem({ todo }: { todo: TodoTaskData }) {
  return (
    <p
      className={`flex items-center justify-start gap-4 text-lg capitalize  ${
        todo.is_completed ? "line-through" : ""
      } `}
    >
      {todo.is_completed ? <Checked /> : <Unchecked />}
      {todo.name}
    </p>
  );
}
