import { CircleCheck, CircleX, Trash } from "lucide-react";
import type { TodoTaskData } from "../types/todoTypes";
import { Button } from "@/components/ui/button";

export default function TodoCardItem({
  todo,
  deleteButton = false,
  deleteFunc,
  succesFunk,
}: {
  todo: TodoTaskData;
  deleteButton?: boolean;
  deleteFunc?: () => void;
  succesFunk?: () => void;
}) {
  return (
    <p
      className={`flex items-center justify-start text-lg capitalize ${
        todo.is_completed ? "line-through" : ""
      } `}
    >
      <Button
        disabled={todo.is_completed}
        variant="ghost"
        onClick={todo.is_completed ? undefined : succesFunk}
        className="flex gap-4 hover:cursor-pointer"
      >
        {todo.is_completed ? (
          <CircleCheck color="green" />
        ) : (
          <CircleX color="red" />
        )}
        {todo.name}
      </Button>
      {deleteButton && (
        <Button onClick={deleteFunc} variant="ghost">
          <Trash />
        </Button>
      )}
    </p>
  );
}
