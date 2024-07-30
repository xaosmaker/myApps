import { Todos } from "../../types/dataTypes";
import Checked from "../../img/icon-yes.svg?react";
import UnChecked from "../../img/icon-no.svg?react";

export default function ShowTodo({ todo }: { todo: Todos }) {
  return (
    <p
      className={`flex items-center justify-start gap-4 text-lg capitalize  ${
        todo.is_completed ? "line-through" : ""
      } `}
    >
      {todo.is_completed ? <Checked /> : <UnChecked />}
      {todo.name}
    </p>
  );
}
