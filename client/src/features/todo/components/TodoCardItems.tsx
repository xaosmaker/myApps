import { CircleCheck, CircleX, Trash } from "lucide-react";
import type { TodoTaskData } from "../types/todoTypes";
import { Button } from "@/components/ui/button";

export default function TodoCardItem({
  todo,
  deleteButton = false,
  deleteFunc,
}: {
  todo: TodoTaskData;
  deleteButton?: boolean;
  deleteFunc?: () => void;
}) {
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
      {deleteButton && (
        <Button onClick={deleteFunc} variant="ghost">
          <Trash />
        </Button>
      )}
    </p>
  );
}
