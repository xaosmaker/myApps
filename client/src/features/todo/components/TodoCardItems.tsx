import { CircleCheck, CircleX } from "lucide-react";
import type { TodoTaskData } from "../types/todoTypes";

export default function TodoCardItem({ todo }: { todo: TodoTaskData }) {
  return (
    <p
      className={`flex items-center justify-start gap-4 text-lg capitalize ${
        todo.is_completed ? "line-through" : ""
      } `}
    >
      {todo.is_completed ? (
        <CircleCheck color="green" />
      ) : (
        <CircleX color="red" />
      )}
      {todo.name}
    </p>
  );
}
