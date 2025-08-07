import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CircleCheck, CircleX } from "lucide-react";
import type { TodoData } from "../types/todoTypes";
import { dateToGRformat } from "@/utils/helperFunctions";
import TodoCardItem from "./TodoCardItems";

export default function TodoCard({
  goto,
  data,
}: {
  data: TodoData;
  goto?: () => void;
}) {
  const { title, completed, complete_until, todo_tasks, expired } = data;

  return (
    <Card
      onClick={goto}
      className={`min-h-48 w-full bg-slate-800 p-2 transition-all duration-300 ease-in-out hover:scale-105 hover:cursor-pointer ${completed && "border-green-500"} ${expired && "border-red-500"}`}
    >
      <CardHeader className="pt-2">
        <CardTitle>{title}</CardTitle>
        <CardDescription className="flex items-center justify-between pt-2">
          EXRIRES: {dateToGRformat(complete_until)}
        </CardDescription>
        <CardAction>
          {completed ? <CircleCheck color="green" /> : <CircleX color="red" />}
        </CardAction>
      </CardHeader>
      <CardContent className="h-full rounded-md bg-slate-700 py-2">
        {todo_tasks.map((item) => (
          <TodoCardItem key={item.pkid} todo={item} />
        ))}
      </CardContent>
    </Card>
  );
}
